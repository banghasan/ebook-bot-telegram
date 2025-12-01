
 /**
 * SimpleTelegramBot Class
 * Framework sederhana untuk berinteraksi dengan Telegram Bot API menggunakan cURL.
 * Penulis: Hasanudin H Syafaat
 */

 <?php /**
  * SimpleTelegramBot Class
  * Framework sederhana untuk berinteraksi dengan Telegram Bot API menggunakan cURL.
  * Penulis: Hasanudin H Syafaat
  */
 class SimpleTelegramBot
 {
     protected $token;
     protected $api_url;
     protected $update;

     /**
      * Konstruktor: Inisialisasi token dan URL API
      * @param string $token Token bot dari @BotFather
      */
     public function __construct($token)
     {
         $this->token = $token;
         $this->api_url = "https://api.telegram.org/bot" . $this->token . "/";
     }

     /**
      * Metode untuk mendapatkan data pembaruan (Update) dari Webhook
      */
     public function getUpdate()
     {
         $content = file_get_contents("php://input");
         $this->update = json_decode($content, true);
         return $this->update;
     }

     /**
      * Wrapper cURL untuk memanggil metode API Telegram
      * @param string $method Nama metode API
      * @param array $params Parameter yang akan dikirimkan
      * @return array Hasil respons dari API
      */
     protected function _request($method, $params = [])
     {
         $url = $this->api_url . $method;
         $ch = curl_init();

         curl_setopt($ch, CURLOPT_URL, $url);
         curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
         curl_setopt($ch, CURLOPT_POST, true);
         curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));

         $response = curl_exec($ch);
         curl_close($ch);

         return json_decode($response, true);
     }

     /**
      * Memeriksa apakah pembaruan saat ini adalah pesan dan dimulai dengan perintah
      * @param string $command Perintah yang dicari (tanpa '/')
      * @return bool
      */
     public function isCommand($command)
     {
         if (isset($this->update["message"]["text"])) {
             $text = $this->update["message"]["text"];
             return strtolower($text) === "/" . strtolower($command);
         }
         return false;
     }

     /**
      * Mendapatkan ID Obrolan (Chat ID) dari pembaruan
      * @return int|null
      */
     public function getChatId()
     {
         if (isset($this->update["message"]["chat"]["id"])) {
             return $this->update["message"]["chat"]["id"];
         }
         if (isset($this->update["callback_query"]["message"]["chat"]["id"])) {
             return $this->update["callback_query"]["message"]["chat"]["id"];
         }
         return null;
     }

     /**
      * Mengirim pesan teks
      * @param int $chat_id ID Obrolan tujuan
      * @param string $text Isi pesan
      * @param array $options Opsi tambahan (reply_markup, parse_mode, dll.)
      * @return array Hasil respons API
      */
     public function sendMessage($chat_id, $text, $options = [])
     {
         $params = array_merge(
             [
                 "chat_id" => $chat_id,
                 "text" => $text,
                 "parse_mode" => "Markdown",
             ],
             $options,
         );

         return $this->_request("sendMessage", $params);
     }

     /**
      * Mengirim foto
      * @param int $chat_id ID Obrolan tujuan
      * @param string $photo URL atau path file foto
      * @param array $options Opsi tambahan
      * @return array Hasil respons API
      */
     public function sendPhoto($chat_id, $photo, $options = [])
     {
         $params = array_merge(
             [
                 "chat_id" => $chat_id,
                 "photo" => $photo,
             ],
             $options,
         );

         // Catatan: Untuk upload file lokal, cURL memerlukan penanganan multipart/form-data
         // Untuk framework sederhana ini, kita asumsikan $photo adalah URL atau file_id
         return $this->_request("sendPhoto", $params);
     }
 }
?>

<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$json = file_get_contents('php://input');
$obj = json_decode($json, TRUE);
$body = file_get_contents('php://input');
$json=json_decode($body);
$entityBody = file_get_contents('php://input');

file_put_contents(__DIR__ . '/output.txt', print_r(json_decode($entityBody), true));




    class Database {        
        private $database = null;
        public $error;
        public $registerError;
        public $sesh;

        function __construct(){ 
            $this->database = new mysqli("XXXX", "XXXX", "XXXX", "XXXX");
            if($this->database->connect_error){
                
                $this->database->close(); 
                //Connection to the database
            }
            else {
                // echo "SQL Connection Success";
            }
            
        }
        
        
        function __destruct() {
            echo nl2br("");
            // echo "Database Closed";
            $this->database->close();
            //Closing the database.
        }
        
        public function statusCode($statusCode){ //Function to set the http status code
            switch($statusCode){
                case 201: 
                    http_response_code(201);
                    break;
                case 400:
                    http_response_code(400);
                    break;
                case 500:
                    http_response_code(500);
                    break;
                case 200:
                    http_response_code(200);
                    break;
                case 204:
                    http_response_code(204);
                    break;
            }
            return $statusCode;
        }
        
        public function request(){ //function to handle all requests
            
            $email = $_POST['email'];
            $userPassword = $_POST['password'];
            $responseCode;
            
            $method = $_SERVER['REQUEST_METHOD'];
            $errors = 0;
            
            if($method === 'POST') 
            {
                 $id = $_POST['idSearch'];
                          
                if(isset($_POST['btnSubmit'])) //checks if the button with the id 'btnSubmit' is clicked
                {
                  
                    $name = $_POST['name'];
                    $item = $_POST['item'];
                    $description = $_POST['description'];
                    $location = $_POST['location'];
                    $fileName = $_POST['image'];
                    $quantity = $_POST['quantity'];
                    //Important variables declared.
                    
                    
                    // Name //
                    if(is_numeric($name)){ //Checking if the name is numerical or not
                        $responseCode = $this->statusCode(400); //Setting the response code.

                        $errors ++; //Setting the amount of errors.
                    }
                    else if(strlen($name) >= 64){ //Checking the length of the name
                        $responseCode = $this->statusCode(400);
                        $errors ++;
                    }
         
                    
                    // Name //
                    
                    
                    // Item //
                    
                    if(is_numeric($item)){
                        $responseCode = $this->statusCode(400);
                        $errors ++;
                    }
                    else if(strlen($item) >= 64){
                        $responseCode = $this->statusCode(400);

                        $errors ++;
                    }
                    
                    // Item //
                    
                    // Description //
                    
                    if(strlen($description) >= 128){
                        $responseCode = $this->statusCode(400);
                        $errors ++;
                    }
                    else if(strlen($description) <= 10){ //Checking if it's lower than 10 characters.
                        $responseCode = $this->statusCode(400);
                        $errors ++;
                    }
                    
                    // Description //
                    
                    // Location //

                    
                    // Location //
                    
                    //Quantity//
                    
                    if(!is_numeric($quantity)) {
                        $responseCode = $this->statusCode(400);
                        $errors ++;
                    }
                    else if($quantity > 5){
                        $responseCode = $this->statusCode(400);
                        $errors ++;
                    }
                    else if($quantity == 0){ //Checking the quantity of the item.
                        $responseCode = $this->statusCode(400);
                        $errors ++;
                    }
                    
                    else if($errors > 0){
                        $this->statusCode($responseCode); //Define the http status code.
                    }

                    
                    //Quantity
            
            
                    else if($errors == 0){ //If there are no errors

                        $sql = "INSERT INTO shareStuff (name, item, description, location, image, available, feedback) VALUES ('$name', '$item', '$description', '$location' ,'$fileName', '$quantity', 'No feedback submitted')"; //Inserting into the database.
                        
                        if($this->database->query($sql)) {
                            $responseCode = $this->statusCode(201);
                            $this->statusCode($responseCode);
                            
                            $output = array("output" => "Submitted");
                            
                            echo json_encode($output);
    
                            
                        }
                    
                        else {
                            $responseCode = $this->statusCode(500);
                            $this->statusCode($responseCode);
                        
                        }
            
                    }
                
                }
                
                
                else if(isset($_POST['btnPickup'])){
                
                    $idPicked = $_POST['idSearch'];
                    $sql = "SELECT available FROM shareStuff WHERE id=?"; //Preventing sql injection
                    
                    $stmt = $this->database->prepare($sql);
                    $stmt->bind_param('s', $idPicked);
                    $stmt->execute();
                    
                    $result = $stmt->get_result();
                    while ($row = $result->fetch_assoc()) {

                        if(empty($row['available'])){
                             $this->statusCode(204);
                            $errors ++;
                        }
                    }

                   
                    if(!is_numeric($idPicked)){
                       $this->statusCode(400);
                        $errors ++;
                    }
           
                    
                    else if($result->num_rows == 0){ //Checks if the result returns any rows
                        $this->statusCode(404);
                        $errors ++;
                        
     
                    }
 
                    
                    else if($errors == 0){
                    
                        $sql = "UPDATE shareStuff SET available = available-1 WHERE id=$id";
                    
                            if($this->database->query($sql)) {
                                $this->statusCode(200);
                                $output = array("output" => "Item Claimed");
                                echo json_encode($output);
                            }
                            else {
                                $this->statusCode(500);
                    
                            }
                        }
                    }
                
                
                
                else if(isset($_POST['btnFeedback'])){
                    $feedback = $_POST['feedbackData'];
                    $id = $_POST['submittionId'];

                     $sql = "SELECT * FROM shareStuff WHERE id=?";
                     $stmt = $this->database->prepare($sql);
                     $stmt->bind_param('s', $id);
                     $stmt->execute();
                     $result = $stmt->get_result();
                     
                     if(!is_numeric($id)){
                      $this->statusCode(400);
                        $errors++;
                     }
                     else if($result->num_rows == 0){
                         //echo "Invalid ID";
                          $this->statusCode(404);
                         $errors ++;
                     }
                     

                    else if($errors == 0){
                    
                        $sql = "UPDATE shareStuff SET feedback = '$feedback' WHERE id = $id ";
               
                    
                            if($this->database->query($sql)) {
                                 $this->statusCode(200);
                                $output = array("output" => "Feedback Submitted");
                                echo json_encode($output);
                            }
                        
                            else {
                                 $this->statusCode(500);
                        
                            }
                        }
                    }
                
                else if(isset($_POST['btnRegister'])){
                    $sql = $this->database->prepare("SELECT * FROM users where email=?");
                    $sql->bind_param("s", $email);
                    $sql->execute();
                    $sql->store_result();
                    if($sql->num_rows == 0){
                        
                                            $sql->fetch();
                    $userPassword = password_hash($userPassword, PASSWORD_DEFAULT);
                    
                    $sql = "INSERT INTO users (email, password)
                    VALUES ('$email', '$userPassword')";
                   
                    if($this->database->query($sql)) {
                      $responseCode = $this->statusCode(201);
                      $output = array("output" => "Account Created");
                        echo json_encode($output);
                        
                                    }
                                    else {
                                 $this->statusCode(500);
                        
                            }
                
                        }
                    }
            }

            
            
            
            else if($method === 'GET'){

               $sql = "SELECT * FROM shareStuff";
               
               
                $data = $this->database->query($sql);
                
                if($data){
                    // echo $this->statusCode(200);
                    $rows = array();
                    while($r = $data->fetch_assoc()){
                        $rows[] = $r;
                    }

                    print json_encode($rows);
                    
                    }
                    else{
                         $this->statusCode(500);
                    }
                }
            }
        }

    $database = new Database;
    $database->request();


?>
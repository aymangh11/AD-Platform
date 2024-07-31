<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ctf_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $submitted_flag = $_POST['flag'];
    
    $sql = "SELECT * FROM flags WHERE flag = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $submitted_flag);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $message = "Flag is correct!";
    } else {
        $message = "Incorrect flag!";
    }
    
    $stmt->close();
} else {
    $message = "";
}

$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>CTF Platform</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <div class="container">
        <h1>CTF Flag Submission</h1>
        <form method="post">
            <input type="text" name="flag" placeholder="Enter Flag">
            <input type="submit" value="Submit">
        </form>
        <p><?php echo $message; ?></p>
    </div>
</body>
</html>

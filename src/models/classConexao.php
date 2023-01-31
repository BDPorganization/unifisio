<?php
    define('dsn', 'pgsql:host=babar.db.elephantsql.com;port=5432;dbname=jobijsbg;user=jobijsbg;password=OfFLfleDzTcILnIyjWGVnChZ9tkZ3cSI');
	
	class Database {
		private static $conn;
		
		public static function getInstance(){
			if (!isset(self::$conn)){
				try{
					self::$conn = new PDO(dsn);
					self::$conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
				}catch(PDOException $e){
					echo $e->getMessage();
				}
				
			}
			return self::$conn;
		}
		
		public static function prepare($sql){
			return self::getInstance()->prepare($sql);
		}
		
	}
?>
<?php  

namespace App\Helpers;
use App\Models\Labtest;
use App\Models\LabTestCategory;
use App\Models\Medicine;
use App\Models\MedicineInventory;
use App\Models\Notification;
use App\Models\User;
use App\Providers\PushNotificationEvent;
use Ixudra\Curl\Facades\Curl;
use Session;
use DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use PDF;
use Illuminate\Support\Facades\Http;

class commonHelper{
    public static function uploadFile($file, $folder)
	{
		// Generate a unique filename with a timestamp and random number
		$filename = strtotime(date('Y-m-d H:i:s')) . rand(11, 99) . '.' . $file->getClientOriginalExtension();

		// Define the destination path for the root/images folder
		$destinationPath = base_path('public/images/' . $folder);

		// Create the folder if it doesn't exist
		if (!file_exists($destinationPath)) {
			mkdir($destinationPath, 0755, true);
		}

		// Get the file extension
		$ext = strtolower($file->getClientOriginalExtension());

		// Check if the file is a PDF
		if ($ext === 'pdf') {
			// Move the PDF file directly without conversion
			$file->move($destinationPath, $filename);
		} else {
			// Move the uploaded file temporarily
			$file->move($destinationPath, $filename);

			// Define quality for WebP conversion
			$quality = 50; 

			// Create the file path
			$filePath = $destinationPath . '/' . $filename;

			// Create an image resource from the file
			$img = imagecreatefromstring(file_get_contents($filePath));

			// Convert to true color to ensure proper WebP conversion
			imagepalettetotruecolor($img);

			// Remove the original file after conversion
			unlink($filePath);

			// Update the filename to use the .webp extension
			$filename = preg_replace('"\.(jpg|jpeg|png|webp)$"', '.webp', $filename);

			// Save the WebP image
			imagewebp($img, $destinationPath . '/' . $filename, $quality);
		}

		// Return the filename
		return $filename;
	}
}
?>
import { initializeApp, cert } from 'firebase-admin/app';
import dotenv from "dotenv";

dotenv.config();

var firebase_foto = initializeApp(
		{
			credential: cert({
				type: "service_account",
				project_id: "fotobridal-83326",
				private_key: process.env.SERVICE_ACCOUNT_FOTO_PRIVATE_KEY? process.env.SERVICE_ACCOUNT_FOTO_PRIVATE_KEY.replace(/\\n/gm, "\n")
				: undefined,
				client_email: "firebase-adminsdk-3j2tu@fotobridal-83326.iam.gserviceaccount.com",
			}),
			storageBucket: 'gs://fotobridal-83326.appspot.com'
		}, 
		'kedua' 
)

// var firebase_main = initializeApp(
// 		{
// 			credential: cert({
// 				type: "service_account",
// 				project_id: "dsista-bridal",
// 				private_key: process.env.SERVICE_ACCOUNT_MAIN_PRIVATE_KEY? process.env.SERVICE_ACCOUNT_MAIN_PRIVATE_KEY.replace(/\\n/gm, "\n")
// 				: undefined,
// 				client_email: "firebase-adminsdk-ocz1k@dsista-bridal.iam.gserviceaccount.com",
// 			}),
// 		}, 
// 		'pertama' 
// )

export { firebase_foto };
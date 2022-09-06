import { initializeApp, cert } from 'firebase-admin/app';
import dotenv from "dotenv";
// import serviceAcc_Foto from '../fotobridal-83326-firebase-adminsdk-3j2tu-0b2b6a4729.json' assert { type: 'json' };
// import serviceAcc_Main from '../dsista-bridal-firebase-adminsdk-ocz1k-717f9775c7.json' assert { type: 'json' };

dotenv.config();

var firebase_foto = initializeApp(
		{
			credential: cert({
				type: "service_account",
				project_id: process.env.SERVICE_ACCOUNT_FOTO_PROJECT_ID,
				private_key_id: process.env.SERVICE_ACCOUNT_FOTO_PRIVATE_KEY_ID,
				private_key: process.env.SERVICE_ACCOUNT_FOTO_PRIVATE_KEY? process.env.SERVICE_ACCOUNT_FOTO_PRIVATE_KEY.replace(/\\n/gm, "\n")
				: undefined,
				client_email: process.env.SERVICE_ACCOUNT_FOTO_CLIENT_EMAIL,
				client_id: process.env.SERVICE_ACCOUNT_FOTO_CLIENT_ID,
				auth_uri: "https://accounts.google.com/o/oauth2/auth",
				token_uri: "https://oauth2.googleapis.com/token",
				auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
				client_x509_cert_url: process.env.SERVICE_ACCOUNT_FOTO_CLIENT_X509_CERT_URL
			}),
			storageBucket: 'gs://fotobridal-83326.appspot.com'
		}, 
		'kedua' 
)

var firebase_main = initializeApp(
		{
			credential: cert({
				type: "service_account",
				project_id: process.env.SERVICE_ACCOUNT_MAIN_PROJECT_ID,
				private_key_id: process.env.SERVICE_ACCOUNT_MAIN_PRIVATE_KEY_ID,
				private_key: process.env.SERVICE_ACCOUNT_MAIN_PRIVATE_KEY? process.env.SERVICE_ACCOUNT_MAIN_PRIVATE_KEY.replace(/\\n/gm, "\n")
				: undefined,
				client_email: process.env.SERVICE_ACCOUNT_MAIN_CLIENT_EMAIL,
				client_id: process.env.SERVICE_ACCOUNT_MAIN_CLIENT_ID,
				auth_uri: "https://accounts.google.com/o/oauth2/auth",
				token_uri: "https://oauth2.googleapis.com/token",
				auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
				client_x509_cert_url: process.env.SERVICE_ACCOUNT_MAIN_CLIENT_X509_CERT_URL
			}),
		}, 
		'pertama' 
)

export { firebase_main , firebase_foto };
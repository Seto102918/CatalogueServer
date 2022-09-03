import { google } from 'googleapis';
import path from 'path';
import dotenv from "dotenv";

dotenv.config();

const getDriveService = () => {
    const KEYFILEPATH = {
        "type": "service_account",
        "project_id": process.env.SERVICE_ACCOUNT_PROJECT_ID,
        "private_key_id": process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID,
        "private_key": process.env.SERVICE_ACCOUNT_PRIVATE_KEY,
        "client_email": process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
        "client_id": process.env.SERVICE_ACCOUNT_CLIENT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": process.env.SERVICE_ACCOUNT_CLIENT_X509_CERT_UR
    };
    const SCOPES = ['https://www.googleapis.com/auth/drive'];

    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES,
    });
    const driveService = google.drive({ version: 'v3', auth });
    return driveService;
};

export default getDriveService;
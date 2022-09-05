import { initializeApp, cert } from 'firebase-admin/app';

import serviceAcc_Foto from '../fotobridal-83326-firebase-adminsdk-3j2tu-0b2b6a4729.json'assert { type: 'json' };
import serviceAcc_Main from '../dsista-bridal-firebase-adminsdk-ocz1k-717f9775c7.json'assert { type: 'json' };

var firebase_foto = initializeApp(
    {
      credential: cert(serviceAcc_Foto),
      storageBucket: 'gs://fotobridal-83326.appspot.com'
    }, 
    'kedua' 
)

var firebase_main = initializeApp(
    {
      credential: cert(serviceAcc_Main),
    }, 
    'pertama' 
)

export { firebase_main , firebase_foto };
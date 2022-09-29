# CatalogueServer

Proyek ini dibuat sebagai server untuk website yang berisi katalog gaun dari bisnis bridal orang tua saya dan dibuat dengan pikiran tanpa biaya apapun (kalau bisa).
Karena itu, opsinya limited dan merupakan salah satu challenge dari proyek ini.

Server ini dibuat dengan NodeJS dan Express dengan Database MongoDB Atlas (Data Gaun) dan Firebase Storage (Foto Gaun).
Frontendnya yang dibuat ada dua: 
  1. client* (hanya menampilkan kalatog dan preview gaun),
  2. admin (Untuk mengubah/menambah/menghapus data gaun dan fotonya)

# List teknologi yang dipakai
  - Javascript
    - ReactJS
  - HTML/CSS
  - Bootstrap
  - NodeJS
    - Express
  - MongoDB Atlas
  - Firebase Storage


# Catatan Limitasi Supaya Gratis
  1. MongoDB Atlas (Cluster Tier M0 [free]) 
      - 10 GB in and 10 GB out per period
      - M0 free clusters allow up to 100 operations per second
      - Maximum of 500 connections
      
    https://www.mongodb.com/docs/atlas/reference/free-shared-limitations/#operational-limitations
  
  2. Firebase Storage
      - 5GB Storage
      - 1GB/day Bandwith
      
  3. Cyclic
      - 5 API requests per second steady state (for free tier)
      - 10 API requests per second in a burst (for free tier)
      - 10 GB code and dependencies file size while building
      - 240 MB final code bundle size per app
      - 30s Maximum request time
      - 6MB Maximum HTTP POST payload size
      
    https://docs.cyclic.sh/overview/limits

# API links
    - All gown data 
    (https://dlux-test.cyclic.app/api/v1/gown)
        - queries
            - kategori (wedding_gown, )
            - warna
            - page
            - sort (A2Z, Z2A, H2L, L2H, FVR, WRN)
            - gownPerPage

        example: 
        https://dlux-test.cyclic.app/api/v1/gown?kategori=wedding_gown&sort=A2Z&warna=Merah&page=0&gownPerPage=1
    
    - One specific gown by Object Id and giving recommended gowns by color 
    (https://dlux-test.cyclic.app/api/v1/gown/id/:id)

        example:
        https://dlux-test.cyclic.app/api/v1/gown/id/63354b1599cfdbf2e68c1dfd

    - also One specific gown by it's code and giving recommended gowns by color 
    (https://dlux-test.cyclic.app/api/v1/gown/kode/:kode)

        example:
        https://dlux-test.cyclic.app/api/v1/gown/kode/WG1


# Little Demo By Using The Admin Frontend
    





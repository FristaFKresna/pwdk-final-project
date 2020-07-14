-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: tokobuku
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_product` int NOT NULL,
  `qty` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cart_users1_idx` (`id_user`),
  KEY `fk_cart_products1_idx` (`id_product`),
  CONSTRAINT `fk_cart_products1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`),
  CONSTRAINT `fk_cart_users1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Agama'),(2,'Biografi'),(3,'Bisnis & Ekonomi'),(4,'Hobby'),(5,'Komik'),(6,'Novel'),(7,'Pendidikan'),(8,'Sejarah'),(9,'Sosial & Politik'),(10,'Teknologi'),(11,'Lainnya');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url_image` varchar(200) NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_images_products1_idx` (`product_id`),
  CONSTRAINT `fk_product_images_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,'public\\products\\PRD-IMG1592529902634.jpg',1),(2,'public\\products\\PRD-IMG1592529974029.jpg',2),(3,'public\\products\\PRD-IMG1592529986181.jpg',3),(4,'public\\products\\PRD-IMG1592529999150.jpg',4),(5,'public\\products\\PRD-IMG1592530017487.jpg',5),(6,'public\\products\\PRD-IMG1592530030095.jpg',6),(7,'public\\products\\PRD-IMG1592530044913.jpg',7),(8,'public\\products\\PRD-IMG1592530058051.jpg',8),(9,'public\\products\\PRD-IMG1592530069839.jpg',9),(10,'public\\products\\PRD-IMG1592530092393.jpg',10),(11,'public\\products\\PRD-IMG1592530226329.jpg',11),(12,'public\\products\\PRD-IMG1592530238482.jpg',12),(13,'public\\products\\PRD-IMG1592530252029.jpg',13),(14,'public\\products\\PRD-IMG1592530266246.jpg',14),(15,'public\\products\\PRD-IMG1592530279880.jpg',15),(16,'public\\products\\PRD-IMG1592530296603.jpg',16),(17,'public\\products\\PRD-IMG1592530318409.jpg',17),(18,'public\\products\\PRD-IMG1592530334057.jpg',18),(19,'public\\products\\PRD-IMG1592530354369.jpg',19),(20,'public\\products\\PRD-IMG1592530371084.jpg',20),(21,'public\\products\\PRD-IMG1592530496709.jpg',21),(22,'public\\products\\PRD-IMG1592530511912.jpg',22),(23,'public\\products\\PRD-IMG1592530526945.jpg',23),(24,'public\\products\\PRD-IMG1592530540080.jpg',24),(25,'public\\products\\PRD-IMG1592530551862.jpg',25),(26,'public\\products\\PRD-IMG1592530568368.jpg',26),(27,'public\\products\\PRD-IMG1592530641788.jpg',28),(28,'public\\products\\PRD-IMG1592530667750.jpg',29),(29,'public\\products\\PRD-IMG1592530692470.jpg',30),(30,'public\\products\\PRD-IMG1592530706293.jpg',32),(31,'public\\products\\PRD-IMG1592530720481.jpg',33),(32,'public\\products\\PRD-IMG1592530756033.jpg',34),(33,'public\\products\\PRD-IMG1592530779722.jpg',35),(34,'public\\products\\PRD-IMG1592530804441.jpg',36),(35,'public\\products\\PRD-IMG1592530819155.jpg',37),(36,'public\\products\\PRD-IMG1592530833434.jpg',38),(37,'public\\products\\PRD-IMG1592530848890.jpg',39),(38,'public\\products\\PRD-IMG1592530863777.jpg',40),(39,'public\\products\\PRD-IMG1592530874781.jpg',41),(40,'public\\products\\PRD-IMG1592530888783.jpg',42),(41,'public\\products\\PRD-IMG1592530902264.jpg',43),(42,'public\\products\\PRD-IMG1592530917027.jpg',44),(43,'public\\products\\PRD-IMG1592530928976.jpg',45),(44,'public\\products\\PRD-IMG1592530943875.jpg',46),(45,'public\\products\\PRD-IMG1592530957973.jpg',47),(46,'public\\products\\PRD-IMG1592530973895.jpg',48),(47,'public\\products\\PRD-IMG1592530986261.jpg',49),(48,'public\\products\\PRD-IMG1592530999598.jpg',50),(49,'public\\products\\PRD-IMG1592531012978.jpg',51),(50,'public\\products\\PRD-IMG1592531036869.jpg',52),(51,'public\\products\\PRD-IMG1592531048722.jpg',53),(52,'public\\products\\PRD-IMG1592531060580.jpg',54),(53,'public\\products\\PRD-IMG1592531075918.jpg',55),(54,'public\\products\\PRD-IMG1592531089681.jpg',56),(55,'public\\products\\PRD-IMG1592531100026.jpg',57),(56,'public\\products\\PRD-IMG1592531112810.jpg',58),(57,'public\\products\\PRD-IMG1592531351393.jpg',27),(58,'public\\products\\PRD-IMG1592531365272.jpg',31);
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `price` int NOT NULL,
  `description` varchar(600) NOT NULL,
  `stock` int NOT NULL,
  `tahun_terbit` int NOT NULL,
  `halaman` int NOT NULL,
  `bahasa` varchar(100) NOT NULL,
  `author` varchar(50) NOT NULL,
  `publishers_id` int NOT NULL,
  `category_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`publishers_id`,`category_id`),
  KEY `fk_products_publishers1_idx` (`publishers_id`),
  KEY `fk_products_category1_idx` (`category_id`),
  CONSTRAINT `fk_products_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_products_publishers1` FOREIGN KEY (`publishers_id`) REFERENCES `publishers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Belajar Pemrograman dan Hacking Menggunakan Python',65000,'Python adalah salah satu bahasa pemrograman yang populer digunakan untuk membuat berbagai macam program, seperti program CLI, Program GUI (desktop), Aplikasi Mobile, Web, IoT, Game, Program untuk Hacking, dan sebagainya.',5,2019,264,'Indonesia','Wardana',3,10,'2020-06-19 07:26:51'),(2,'5 Pemrograman Dasar Desain Website',80000,'Pembuatan website modern minimal membutuhkan lima bahasa pemrograman berikut: HTML, CSS, Javascript, PHP, dan MySQL. Hampir seluruh website di dunia ini diprogram menggunakan salah satu atau seluruh bahasa pemrograman tersebut. Oleh karena itu, Anda membutuhkan wawasan menyeluruh dalam satu buku yang mengupas kelimanya secara praktis.',2,2019,312,'Indonesia','Jubilee Enterprise',3,10,'2020-06-19 07:26:51'),(3,'Lancar Java dan Javascript',75000,'Java dan Javascript adalah bahasa pemrograman yang terus berkembang. Java dapat digunakan untuk membuat aplikasi lintas platform, baik untuk komputer maupun Android. Sedangkan Javascript merupakan bahasa pemrograman untuk pengembangan website yang terus dipelajari hingga kini. Dapat dikatakan bahwa kedua bahasa pemrograman ini merupakan batu pijakan pertama untuk mempelajari pembuatan aplikasi masa depan.',4,2019,320,'Indonesia','Jubilee Enterprise',3,10,'2020-06-19 07:26:51'),(4,'Tip & Trik Program Database Java',75000,'\"Buku dengan judul Tip & Trik Program Database Java ini merupakan buku yang memberi pengetahuan secara lengkap bagaimana bahasa pemrograman Java menggunakan database dengan koneksinya. Mengetahui teknik koneksi program Java terhadap database tertentu akan memudahkan pembuatan program aplikasi bisnis dengan Java memakai database apa saja.\n\"',7,2019,300,'Indonesia','Yuniar Supardi',3,10,'2020-06-19 07:26:51'),(5,'Kitab Hacker',75000,'Anda bercita-cita menjadi hacker handal? Kabar gembira untuk Anda karena buku ini dapat mewujudkan cita-cita Anda tersebut. Sungguh tujuan buku ini ditulis bukan untuk mengajari Anda menjadi seorang pencuri data atau pembobol sistem orang lain. Buku ini memiliki tujuan yang mulia, yaitu membantu Anda memahami ilmu hacking agar Anda tidak menjadi korban retas dari orang-orang yang tidak bertanggung jawab.',3,2019,280,'Indonesia','Dedik Kurniawan',3,10,'2020-06-19 07:26:51'),(6,'Attack on Titan 27',27000,'Eren yang menyusup ke Marley dengan tujuan membawa pulang Zeke ke Eldia, memberikan pukulan yang sangat besar pada musuh. Dengan memiliki Zeke yang mewarisi darah keluarga raja, Eren, dkk, pun telah memenuhi syarat pengaktifan \"guncangan tanah\", yaitu kekuatan untuk menghadapi dunia. Tapi, di saat yang sama, itu juga menjadi tanda dimulainya hitung mundur menuju perang total...',1,2019,200,'Indonesia','Hajime Isayama',3,4,'2020-06-19 07:26:51'),(7,'Fight Ippo 122',27000,'Akhirnya Ippo kembali ke arena tinju! Namun kali ini bukan sebagai petinju di atas ring, melainkan sebagai second di sisi ring! Pertandingan yang akan menjadi lembaran baru hidupnya ini memacu semangatnya. Dia siap mencurahkan segenap jiwa dan raganya untuk membantu kemenangan Kimura. Dengan yang terbebas dari pemberat, Ippo pun... menerbangkan kursi!?',3,2019,192,'Indonesia','Joji Morikawa',3,4,'2020-06-19 07:26:51'),(8,'Karate Master Minoru 26',27000,'Untuk pertamakalinya, Mutou berpartisipasi di K.O.S dan berhadapan dengan Gerard Lopman, juara bertahan dunia 9 kali. Lopman yang dijuluki \"tangan kanan iblis\", menantang Mutou dengan pertandingan ganas di atas ring!',7,2019,200,'Indonesia','Baba Yasushi',3,4,'2020-06-19 07:26:51'),(9,'After School Charisma 03',27000,'Hanya Shiro yang selama ini percaya bahwa dia satu-satunya murid yang bukan kloning di Akademi Saint Kleio tempat kloning para tokoh penting dunia bersekolah, namun tiba-tiba muncul seorang pria yang sangat mirip dengannya.',5,2019,200,'Indonesia','Suekane Kumiko',3,4,'2020-06-19 07:26:51'),(10,'Attack on Titan 26',27000,'Saat Marley memaparkan ancaman Pulau Paradis terhadap seluruh dunia, tiba-tiba muncullah Eren Yeager, sang “pemberontak kedamaian”. Eren bermaksud untuk menyapu bersih orang-orang Marley dan memberikan pukulan besar pada militer mereka. Pertarungan Eren dengan Titan Palu Perang berlangsung sengit dan daya tempur terbesar dari kedua negara yang telah berkumpul pun akhirnya beradu...',7,2019,200,'Indonesia','Hajime Isayama',3,4,'2020-06-19 07:26:51'),(11,'Mindful Trader',70000,'Buku ini adalah sebuah terobosan baru, bahwa semua aktivitas trading tidak seharusnya menyakiti, malah membanggakan. Yang berlaku di sini adalah mindfulness, sebuah proses psikologi. Sebuah kondisi bahwa Anda secara sadar akan tenang menghadapi kejadian apa pun di pasar modal yang ada di hadapan Anda. Tenang dalam berpikir, tenang dalam mengamati, tenang dalam bertindak, dan berpikir dahulu sebelum melakukan semua tindakan yang akan Anda lakukan.',4,2019,232,'Indonesia','William Hartanto',3,3,'2020-06-19 07:34:13'),(12,'How to Have A Beautiful Mind',76800,'Apakah itu keindahan? Keindahan adalah sesuatu yang bisa dihargai oleh orang lain. Pikiran indah yang dijelaskan dalam buku ini yang selanjutnya akan disebut sebagai pikiran yang menarik adalah sebuah pikiran yang bisa dihargai oleh orang lain. Ia bukan sebuah pikiran seseorang yang duduk sendiri di pojok ruangan sambil menyelesaikan sebuah puzzle yang sulit. Ia adalah sebuah pikiran yang bisa dihargai oleh orang lain—biasanya melalui percakapan.',7,2017,268,'Indonesia','Edward de Bono',3,3,'2020-06-19 07:34:13'),(13,'Strategi Keuangan Perusahaan',62800,'Buku ini ditujukan bagi perusahaan yang menginginkan informasi ideal bagaimana pengelolaan keuangan perusahaan dijalankan. Dapat dipergunakan oleh organisasi keuangan perusahaan, yaitu Direktur, Manajer, Supervisor dan Staff, di bidang akademisi digunakan oleh mahasiswa dan dosen untuk mempelajari dan menambah wawasan bagaimana implementasi keuangan diterapkan. ',3,2020,224,'Indonesia','Lukmanul Hakim',3,3,'2020-06-19 07:34:13'),(14,'Investment Guide Series: Psychology of Investing',80000,'Meskipun peluang berinvestasi terbuka lebar, masih banyak perilaku investor yang mungkin dapat membahayakan investasi mereka. Para investor mungkin saja melakukan jenis investasi yang sebenarnya tidak mereka pahami dan mengambil risiko yang sebenarnya tidak diperlukan. Padahal, investasi yang berhasil di masa lalu dan/atau cocok untuk orang-orang tertentu belum tentu cocok untuk orang yang lain.',7,2019,224,'Indonesia','Toshiro Aoki',3,3,'2020-06-19 07:34:13'),(15,'Investment Guide Series: How to Survive in Stock Markets',80000,'Buku ini memberikan pengetahuan tentang hal-hal mendasar dalam berinvestasi dan akan membantu Anda memahami cara mengelola modal, apakah Anda sebagai investor atau sebagai spekulan. ',10,2019,168,'Indonesia','Arata Yaguchi',3,3,'2020-06-19 07:34:13'),(16,'Seri Paud Cerdas dan Ceria 1: ABC Mengenal Huruf',48000,'\"Buku ini bisa dijadikan sebagai buku pertama untuk anak-anak usia PAUD, karena di buku ini anak-anak diajak mengenal huruf sekaligus dengan huruf depan nama hewan-hewan, seperti huruf A disertai gambar angsa.\n\n\"',4,2019,56,'Indonesia','Putra Adi Setiyawan',3,7,'2020-06-19 07:34:13'),(17,'Segala Sesuatu tentang Bencana',80000,'Belakangan ini, bencana semakin sering datang. Planet Bumi semakin rentan. Banjir, gempa bumi, tsunami, tanah longsor, dan letusan gunung berapi datang silih berganti. Bagaimana bencana bisa terjadi? Apa penyebabnya? Apa yang harus kita lakukan saat bencana datang? Bagaimana cara supaya selamat dari bencana?',6,2019,80,'Indonesia','Yusup Somadinata',3,7,'2020-06-19 07:34:13'),(18,'Cerdas Berhitung PAUD',80000,'Berhitung adalah salah satu keterampilan dasar yang harus dimiliki oleh anak. Keterampilan berhitung sangatlah penting dan melalui buku ini, anak-anak akan diajak berhitung secara cerdas dengan mengetahui dan menulis angka.',7,2019,132,'Indonesia','YULI KISMAWATI, S.Pd.',3,7,'2020-06-19 07:34:13'),(19,'Riang Membaca Paud',60000,'Buku berisi latihan membaca untuk anak PAUD. Setiap huruf selalu disertai dengan bendanya agar anak-anak mudah mengenal huruf dengan membayangkan benda itu langsung.',8,2019,88,'Indonesia','Andi Putra',3,7,'2020-06-19 07:34:13'),(20,'Buku Pertamaku Mengenal Warna',50000,'\"Buku ini sangat tepat untuk anak-anak usia di bawah lima tahun karena isinya sangat sederhana dan sesuai dengan daya pikir anak-anak usia balita. Dengan gambar yang menarik disesuaikan dengan temanya yaitu dan mengenal warna yang disertai dengan benda-bendanya.\n\n\"',4,2019,12,'Indonesia','M. Isnaeni',3,7,'2020-06-19 07:34:13'),(21,'Memoar Marla',90000,'Marla Wijaya bunuh diri di acara Prom Night! Lima tahun setelah kejadian tersebut, sepucuk surat teror tanpa nama mampir di kotak pos Claudia. Bersamaan dengan itu, undangan di grup WhatsApp SMA untuk menghadiri peringatan lima tahun kematian Marla muncul. Claudia dipaksa kembali mengenang memorinya bersama Marla yang sudah lama dia tutup rapat. Marla bukan teman dekatnya di sekolah, tetapi sehari sebelum kematian gadis itu, Claudia mengabaikannya.',5,2019,400,'Indonesia','Safira Hapsari',3,6,'2020-06-19 07:40:59'),(22,'The Innkeeper`s Sister',88000,'\"Grayson Blake selalu mempunyai tujuan dan tidak pernah menyia-nyiakan waktu. Dia kembali ke Honey Ridge untuk mengubah sebuah pabrik penggilingan bersejarah menjadi restoran, tetapi rencana itu hancur berantakan ketika sebuah kerangka manusia ditemukan di bawah tanah pabrik itu dan menguak misteri masa Perang Saudara. Peristiwa ini mengantarkannya kepada seorang wanita cantik yang sudah tak asing lagi baginya.\n\"',4,2019,392,'Indonesia','Linda Goodnight',3,6,'2020-06-19 07:40:59'),(23,'LIT: Hectic, Hectic, Hat Trick!',65000,'Safiya adalah seorang pelajar di salah satu SMA unggulan di Jakarta yang sedang dibuat bingung. Blog pribadinya dibekukan oleh pihak sekolah. Tulisannya di blog mengenai sekolah dianggap terlalu kontroversial. Safiya pun terancam dikeluarkan dari sekolah jika tetap nekat melakukannya, karena dianggap merusak nama baik sekolah. Gadis itu pun hanya belajar dan mengikuti kegiatan ekstrakurikuler tanpa menulis, yang membuatnya merasa hampa.',7,2019,224,'Indonesia','Sashi Kirana',3,6,'2020-06-19 07:40:59'),(24,'Marry in Scandal',98000,'Lady Lily Rutherford yang pemalu tidak ingin terburu-buru menikah. Dia memimpikan cinta sejati dan pendekatan yang romantis. Akan tetapi, ketika malapetaka menimpa, Lily mendapati dirinya dipaksa untuk menikahi penyelamatnya, Edward Galbraith, demi meredam rumor yang muncul.',3,2019,496,'Indonesia','Anne Gracie',3,6,'2020-06-19 07:40:59'),(25,'Lain Waktu: Sebuah Novel Absurd',60000,'\"Aku telah menghabiskan banyak buku.\nNamun tak pernah menemukan perpustakaan selengkap dirimu,\ntempat setiap kata dan kalimatnya senantiasa membuatku puas.\n\nWahai Wanita Bermata Dua\nAku mencintai kedua matamu:\nmata kepalamu dan mata hatimu.\n\nWahai Wanita Bermata Dua\nRasa itu datang tiba-tiba.\nMungkin sepuluh atau lima belas tahun lalu.\nMungkin di lain waktu.\n\"',8,2019,212,'Indonesia','Hilmi Abedillah',3,6,'2020-06-19 07:40:59'),(26,'Duel Para Elang - Pertempuran Udara di Atas Hindia Belanda',130000,'Langit di atas Indonesia (Hindia Belanda) pernah menjadi saksi terjadinya beberapa pertempuran udara paling sengit dalam sejarah. Buku ini mengisahkan beberapa pertempuran tersebut yang turut menentukan arah perjalanan Indonesia, lepas dari penjajahan.',2,2019,280,'Indonesia','Nino Oktorino',3,8,'2020-06-19 07:40:59'),(27,'Shakai Kaizo - Seratus Tahun Reformasi Jepang',74000,'Melanjutkan debutnya dalam Seikatsu Kaizen, Susy Ong kembali memaparkan apa yang terjadi dalam tahun ke-100 terjadinya reformasi di Jepang dalam semua aspek kehidupan masyarakatnya. Demikian besarnya peran pemerintah, menjadi penentu keberhasilan perubahan pola hidup dan mindset rakyat Jepang, dari bangsa yang \"tidak tahu aturan\" dan kalah perang, menjadi sebuah bangsa yang unggul di segala bidang.',9,2019,272,'Indonesia','Susy Ong',3,9,'2020-06-19 07:40:59'),(28,'Hitler - Sosok Pria di Balik Monster',110000,'Bagaimana kita mengukur seseorang yang terbiasa dianggap sebagai monster? Bagaimana kita memahami seseorang yang menjadi mitos kejahatan? Begitu mengerikan kejahatan orang ini sehingga semakin penting bagi kita untuk membahas Hitler sebagaimana dirinya sebenarnya.',6,2019,228,'Indonesia','Michael Kerrigan',3,2,'2020-06-19 07:40:59'),(29,'Kaisar Pertama China - Qinshihuang, Tentara Terakota dan Tembok Besar',150000,'Sosok Qinshihuang sendiri adalah figur yang kontroversial. Ia naik tahta sebagai raja belia yang ambisius dan bijaksana, yang pandai menilai bakat seseorang dan mampu melihat peluang yang ada. Dengan gigih dan tekad baja, ia memimpin negerinya mengalahkan negara-negara feodal lainnya satu-persatu, sampai akhirnya hanya Qin satu-satunya negeri yang tersisa di seluruh China.',4,2019,608,'Indonesia','Michael Wicaksono',3,8,'2020-06-19 07:40:59'),(30,'Achtung Tiger - Kisah Legendaris Unit Tank Berat Waffen-SS',130000,'Unit Tank Berat Jerman pada masa Perang Dunia II sangat dikenal sekaligus ditakuti oleh pihak Sekutu. Dengan dimotori oleh tank Tiger yang legendaris, unit ini menebar maut dan mimpi buruk di semua front Eropa, Afrika dan Balkan. Sedemikian terkenalnya unit tank berat ini, hingga pihak Sekutu menyebut semua kendaraan lapis baja Jerman yang mereka temui dengan nama \"Tiger\". ',3,2019,488,'Indonesia','Nino Oktorino',3,8,'2020-06-19 07:40:59'),(31,'Indonesia: Menuju Kekuatan Global Abad 21',60000,'Kekuatan sebuah negara tidak hanya tergantung pada kekuatan militernya saja, melainkan segenap potential resource negara tersebut, termasuk di antaranya, dan yang mungkin merupakan ujung tombak adalah politik luar negeri negara itu. Indonesia, dengan politik luar negeri di era Jokowi, punya potensi besar menjadi salah satu negara terkuat di dunia. ',3,2019,224,'Indonesia','Mohamad Rosyidin',3,9,'2020-06-19 07:48:18'),(32,'Tahu Gak Tahu',66000,'Tahu Gak Tahu! adalah kumpulan kebiasaan penduduk negeri +62 yang diilustrasikan dengan jenaka oleh @kertas.kindew. Persoalan cari kerja sampai cari jodoh dibahas dengan sedikit sentilan karena kadang kita butuh tersentil biar nggak hilang kesadaran',5,2019,124,'Indonesia','kertas.kindew',4,5,'2020-06-19 07:48:18'),(33,'Jagat Lelembut',88000,'Jagat lelembut atau dunia para makhluk halus, sampai saat ini masih mendapatkan image mengerikan di mata banyak orang. Sosok-sosok di dalamnya selalu digambarkan seram seperti halnya yang sering kita lihat di layar televisi. Belum lagi bumbu-bumbu yang sengaja dibuat dengan tujuan menakut-nakuti. Namun demikian, kita justru makin penasaran dengan keberadaan dunia “mereka”. Seperti apa sosok dan cerita para lelembut yang sebenarnya?',7,2019,208,'Indonesia','kisahtanahjawa',4,4,'2020-06-19 07:48:18'),(34,'Kisah Tanah Jawa',99000,'Tanah Jawa menyimpan banyak kisah misteri yang takkan habis diceritakan dalam semalam. Sosok misterius, ritual mistis, dan tempat angker, selalu membuat kita penasaran. Buku Kisah Tanah Jawa mengajak pembaca membuka selubung mitos dan mistis yang selama ini hanya menjadi kasak-kusuk di masyarakat.',10,2019,213,'Indonesia','kisahtanahjawa',4,4,'2020-06-19 07:48:18'),(35,'Pengabdi Netijen',66000,'Pengabdi Netijen menceritakan pengalaman Geraldy Tan, seorang cowok yang tadinya bukan siapa-apa, tapi karena keinginan dan impian yang kuat, bisa meraih hal-hal yang tidak pernah dia bayangkan. Bahkan, kini ia dikenal banyak orang. Lewat video receh, Gerry sekarang punya banyak teman, juga banyak endorse-an.',6,2019,188,'Indonesia','Geraldy Tan',4,2,'2020-06-19 07:48:18'),(36,'Dear Parents: Gamers Juga Bisa Sukses',138000,'Di Indonesia, kita bisa menemukan beragam jenis kue dan bolu yang lezat. Mulai dari kue-kue kekinian hingga kue jadul yang telah ada sejak zaman colonial Mulai dari kue-kue kekinian, hingga kue jadul yang telah ada sejak zaman colonial. penjajahan Belanda tidak selalu meninggalkan kisah kelam. Ada beberapa hal yang bisa diwariskan, salah satunya bidang boga dessert masak memasaknya. ',3,2020,140,'Indonesia','Arif Budi Prayitno',5,4,'2020-06-19 07:48:18'),(37,'Makan-Makan Club Hits di Instagram - Sajian Gurih Laris Dijual ala Resto dan Café',125000,'Penulis buku ini, Dhila Sina adalah sosok ibu zaman now yang eksis di media sosial khususnya instagram. seorang ibu rumah tangga multi tasking dan multi talenta, selain mengurusi anak dan suami tercinta juga hobi memasak dan food photography. Buku ini memuat 65 resep sajian gurih hidangan Laris yang sedang hits serta disukai penikmat kuliner.',6,2020,138,'Indonesia','Dhila Sina',5,4,'2020-06-19 07:48:18'),(38,'Chef Norman in The Kitchen: 40 Resep Masakan Nusantara Penyajian Elegan',118000,'Penulis buku ini, Chef norman ismail telah 20 tahun lebih berkarya di dunia boga, baik sebagai owner restoran, cooking trainer, maupun konsultan boga. Buku ini berisi 40 resep nusantara berbahan ikan, daging, dan sayuran dan sambal khas seperti jantung pisang, rebung dan gandaria.',4,2020,92,'Indonesia','Norman Ismail',5,4,'2020-06-19 07:48:18'),(39,'English for Professional Airline Service',90000,'English for Professional Airline Services is a course book designed for front liners of airlines, airlines offices, reservation and ticketing offices, travel agents and airports. This book is also worth learning for trainees of airline services, airline cabin crew or flight attendants, students of tourism schools majoring in travel business, individuals and senior high school students who intend to join airlines.',5,2017,296,'Inggris','Sutanto Leo',5,7,'2020-06-19 07:48:18'),(40,'Setelah Poso: Pembinaan Teritorial dan Jaringan Pascakonflik',150000,'Sejak awal, Tentara Nasional Indonesia (TNI) tidak dapat dipisahkan dari rakyat. Bahkan, secara historis TNI berawal dari organisasi bernama Badan Keamanan Rakyat (BKR), yang kemudian berkembang menjadi Tentara Keamanan Rakyat (TKR), dan berubah lagi menjadi Tentara Republik Indonesia (TRI). Oleh karena itu, TNI sungguh lahir dari rakyat, hidup bersama rakyat, dan berjuang untuk rakyat. Rakyat menjadi bagian penting dari jati diri dan pelaksanaan visi dan misi TNI.',7,2019,300,'Indonesia','Agus SB',5,9,'2020-06-19 07:48:18'),(41,'Korupsi: Melacak Arti, Menyimak Implikasi',195000,'Buku ini berhasil dengan fasih menjelaskan korupsi yang menghimpit peradaban dengan pendekatan multi-disiplin yang sempurna. Saya belajar banyak dari setiap alineanya, sehingga “wajib” dibaca oleh anak bangsa yang peduli akan masa depan negeri tercinta. —Laode M. Syarif, Ph.D. Wakil Ketua Komisi Pemberantasan Korupsi (KPK) dan Dosen Universitas Hasanuddin',3,2018,684,'Indonesia','B. Herry Priyono',5,9,'2020-06-19 07:55:21'),(42,'Inteligen dan Pilkada',99800,'Jika Pilkada adalah adu gagasan demi memberikan yang terbaik untuk rakyat, maka strategi pemenangannya penting untuk dicermati. Salah satu strategi yang dapat ditempuh adalah “pendekatan intelijen”, dan inilah yang akan menjadi fokus utama buku ini. Berangkat dari pengalaman riil di lapangan, penulis menunjukkan pendekatan alternatif untuk meraih kemenangan tanpa terjerumus ke dalam praktik politik uang (money politics).',5,2018,242,'Indonesia','Stepi Anriani',5,9,'2020-06-19 07:55:21'),(43,'Economists with Guns',95000,'Pada masa Eisenhower, AS berupaya mengubah arah politik Indonesia dan menggulingkan Sukarno yang cenderung sosialis.',9,2011,200,'Inggris','Bradley R. Simpson',5,9,'2020-06-19 07:55:21'),(44,'Kearifan Al-Qur\'an',83000,'\"Sebagai permulaan Islam dan manifestasinya yang terpenting, Al-Qur’an merupakan dunia tempat kaum Muslim hidup. Ia adalah ajaran yang relevan untuk kehidupan manusia kapan saja dan di mana saja. Berlaku sepanjang masa, norma-normanya menjadi ukuran seluruh hukum yang berlaku dalam masyarakat, baik hukum positif, moral, susila, maupun adat kebiasaan.\n\"',3,2020,252,'Indonesia','Prof. Dr. H. Muhammad Chirzin, M.Ag',5,1,'2020-06-19 07:55:21'),(45,'Kamus Pintar Al-Qur\'an',125000,'Al-Qur’an adalah kitab akhir zaman, pegangan hidup kita. Dengan membaca, memahami, dan menerapkan isinya, banyak kebaikan yang bisa kita raih.',6,2020,720,'Indonesia','Prof. Dr. H. Muhammad Chirzin, M.Ag',5,1,'2020-06-19 07:55:21'),(46,'Fransiskus: Manusia Pendoa',68000,'Jorge Mario Bergoglio, yang sekarang menjadi Paus Fransiskus, adalah seorang pendoa sekaligus pekerja. Ia adalah sosok bersahaja yang selalu mementingkan orang lain. Meski tampak polos dan sederhana, Paus Fransiskus memiliki latar belakang teologis yang tidak tanggung-tanggung. Ia adalah seorang tokoh besar, tetapi masih menempuh perjalanan dengan kereta bawah tanah dan bus seperti kebanyakan warga biasa.',3,2019,216,'Indonesia','Mario Escobar',5,1,'2020-06-19 07:55:21'),(47,'Jalan Sederhana',55000,'Pada awalnya, Ibu Teresa tidak yakin akan prospek buku ini. Banyak buku mengenai dirinya telah diterbitkan. Ia merasa ragu, apakah kata-kata yang lebih banyak akan membawa seseorang lebih dekat pada pemahaman akan arti perutusannya. Semuanya begitu sederhana, katanya. Mengapa orang memerlukan petunjuk untuk jalan yang begitu sederhana?',6,2019,176,'Indonesia','Lucinda Vardey',5,1,'2020-06-19 07:55:21'),(48,'Tata Cara Shalat Lengkap yang Dicintai Allah dan Rasulullah',58000,'\"Buku ini bukan hanya bermanfaat bagi yang baru belajar shalat, tetapi orang yang sudah lama melaksanakan shalat juga penting mempelajarinya lagi, agar shalat kita menjadi sempurna. Karena seorang ulama pernah berkata, “Ada orang shalat sudah 60 tahun, tapi ibadahnya itu sia-sia.” Jangan sampai shalat kita seumur hidup tidak diterima Allah karena kita tidak mau lagi belajar shalat. Karena sesungguhnya tidak ada kata selesai untuk belajar shalat.\n\"',3,2018,156,'Indonesia','Yoli Hemdi',5,1,'2020-06-19 07:55:21'),(49,'Barista#NoCingCong',140250,'\"Kompetisi barista adalah sebuah game, kita butuh banyak strategi. Kompetisi ini bukanlah one man show, ini adalah team work Untuk memenangkan game ini, gue harus menurunkan ego dan menerima banyak masukan dari orang lain \"\"� Muhammad Aga (P\' Winner IBC 2018)\n\"',5,2019,186,'Indonesia','Willy Sidewalk',1,4,'2020-06-19 07:55:21'),(50,'Mengenal & Memelihara 15 Koi Paling Diminati',110000,'\"Koi dianggap oleh sebagian orang sebagai ikan pembawa keberuntungan dan simbol status sosial. Corak dan pola warna yang indah, ukuran tubuh, umur yang panjang, gemulai gerakannya di dalam kolam, hingga jinaknya ikan hias ini, telah menjadi sarana hiburan dan relaksasi bagi banyak orang.\n\"',4,2019,146,'Indonesia','Sugiarto Budiono',1,4,'2020-06-19 07:55:21'),(51,'Rectoverso',63200,'\"Sebuah kisah indah selalu melekat dalam kenangan, seperti jejak yang ditatah di atas karang.\n\nRectoverso adalah kisah itu. \nSegala emosi terwakili di dalamnya. \nAda kesedihan, suka cita, ragu-ragu, ketakutan, membentuk alur penuh cabang, \nmeski pada akhirnya akan kembali kepada muara yang sama.\"',10,2013,198,'Indonesia','Dee Lestari',2,6,'2020-06-19 08:00:44'),(52,'Biographic Novel: Che Guevara',31200,'Semuanya bermula dari sebuah perjalanan panjang. Che Guevara, bersama sahabatnya, bertekad untuk menjelajah Amerika latin dengan La Poderosa II, motor butut Norton 500 cc. Petualangan yang seharusnya diisi dengan roman dan petualangan, justru memperlihatkan sisi gelap Amerika Latin. Mereka disuguhi penderitaan berat kaum miskin, yang tak berdaya di tanah airnya sendiri.',3,2013,192,'Indonesia','Chie Shimano dan Kiyoshi Konno',2,2,'2020-06-19 08:00:44'),(53,'Perahu Kertas',55200,'Namanya Kugy. Mungil, pengkhayal, dan berantakan. Dari benaknya, mengalir untaian dongeng indah. Keenan belum pernah bertemu manusia seaneh itu. ... Namanya Keenan. Cerdas, artistik, dan penuh kejutan. Dari tangannya, mewujud lukisan-lukisan magis. Kugy belum pernah bertemu manusia seajaib itu. ... Dan kini mereka berhadapan di antara hamparan misteri dan rintangan. Akankah dongeng dan lukisan itu bersatu? Akankah hati dan impian mereka bertemu?',5,2015,564,'Indonesia','Dee Lestari',2,6,'2020-06-19 08:00:44'),(54,'Nelson Mandela The Authorized Biography',152150,'Meski dikungkung dalam penjara politik selama tiga dasawarsa, Nelson Mandela telah memimpin Afrika Selatan keluar dari Apartheid ke Demokrasi. Seorang pria yang hidupnya dijalani dengan keberanian, penuh keteladanan, dan keyakinan yang menginspirasi.',3,2016,724,'Indonesia','Anthony Sampson',2,2,'2020-06-19 08:00:44'),(55,'Sayap-Sayap Patah',47200,'Dengan sensitivitasnya yang luar biasa, Kahlil Gibran merajut sebuah kisah cinta tentang sepasang kekasih yang indah dan menggelora. Namun, cinta mereka bukanlah tanpa halangan. Tradisi, tabu, politik, dan ketidakadilan menjadi penghalang bagi keduanya untuk bersatu.',8,2017,421,'Indonesia','Kahlil Gibran',2,6,'2020-06-19 08:00:44'),(56,'Dilan: Dia Adalah Dilanku Tahun 1990',55200,'\"\"\"Milea kamu cantik, tapi aku belum mencintaimu. Enggak tahu kalau sore. Tunggu aja.\"\" (Dilan 1990)\n\n\"\"Milea jangan pernah bilang ke aku ada yang menyakitimu., nanti besoknya, orang itu akan hilang.\"\" (Dilan 1990)\n\n\"\"Cinta sejati adalah kenyamanan, kepercayaan, dan dukungan. Kalau kamu tidak setuju, aku tidak peduli.\"\" (Milea 1990)\n\n\"',4,2019,348,'Indonesia','Pidi Baiq',2,6,'2020-06-19 08:00:44'),(57,'LASKAR PELANGI',75650,'Begitu banyak hal menakjubkan yang terjadi dalam masa kecil para anggota Laskar Pelangi. Sebelas orang anak Melayu Belitong yang luar biasa ini tak menyerah walau keadaan tak bersimpati pada mereka. ',4,2020,340,'Indonesia','Andrea Hirata',2,6,'2020-06-19 08:00:44'),(58,'The Naked Traveler 1 Year Round The World Trip',58650,'\"Trinity, travel writer terlaris Indonesia, berhasil mewujudkan mimpinya jalan-jalan selama 1 tahun penuh! Berbekal paspor hijau, Trinity telah mencapai hampir 150.000 km dan berkunjung ke 22 negara di dunia.\n\"',7,2020,232,'Indonesia','Trinity',2,4,'2020-06-19 08:00:44');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publishers`
--

DROP TABLE IF EXISTS `publishers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publishers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `url_publisher_logo` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publishers`
--

LOCK TABLES `publishers` WRITE;
/*!40000 ALTER TABLE `publishers` DISABLE KEYS */;
INSERT INTO `publishers` VALUES (1,'Agromedia','public\\publisher\\PUBLISHER1592528815908.jpg'),(2,'Bentang Pustaka','public\\publisher\\PUBLISHER1592528836338.png'),(3,'Elex Media Komputindo','public\\publisher\\PUBLISHER1592528853640.png'),(4,'Gagas Media','public\\publisher\\PUBLISHER1592528866772.png'),(5,'Gramedia Pustaka Utama','public\\publisher\\PUBLISHER1592528952648.jpg');
/*!40000 ALTER TABLE `publishers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rating` int NOT NULL,
  `review_title` varchar(50) DEFAULT NULL,
  `review_body` varchar(200) DEFAULT NULL,
  `users_id` int NOT NULL,
  `products_id` int NOT NULL,
  PRIMARY KEY (`id`,`users_id`,`products_id`),
  KEY `fk_rating_users1_idx` (`users_id`),
  KEY `fk_rating_products1_idx` (`products_id`),
  CONSTRAINT `fk_rating_products1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`),
  CONSTRAINT `fk_rating_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_transaction` int NOT NULL,
  `total_item` int NOT NULL,
  `url_payment_proof` varchar(200) DEFAULT NULL,
  `name_bank_account` varchar(100) DEFAULT NULL,
  `bank_account` int DEFAULT NULL,
  `notes` varchar(200) DEFAULT NULL,
  `transaction_status_id` int NOT NULL,
  `users_id` int NOT NULL,
  PRIMARY KEY (`id`,`transaction_status_id`,`users_id`),
  KEY `fk_transaction_users1_idx` (`users_id`),
  KEY `fk_transaction_transaction_status1_idx` (`transaction_status_id`),
  CONSTRAINT `fk_transaction_transaction_status1` FOREIGN KEY (`transaction_status_id`) REFERENCES `transaction_status` (`id`),
  CONSTRAINT `fk_transaction_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_detail`
--

DROP TABLE IF EXISTS `transaction_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(150) NOT NULL,
  `product_price` int NOT NULL,
  `qty` int NOT NULL,
  `transaction_id` int NOT NULL,
  PRIMARY KEY (`id`,`transaction_id`),
  KEY `fk_transaction_detail_transaction1_idx` (`transaction_id`),
  CONSTRAINT `fk_transaction_detail_transaction1` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_detail`
--

LOCK TABLES `transaction_detail` WRITE;
/*!40000 ALTER TABLE `transaction_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_status`
--

DROP TABLE IF EXISTS `transaction_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_status`
--

LOCK TABLES `transaction_status` WRITE;
/*!40000 ALTER TABLE `transaction_status` DISABLE KEYS */;
INSERT INTO `transaction_status` VALUES (1,'Waiting for Payment'),(2,'Waiting for Approvement'),(3,'on Packaging'),(4,'on Delivery'),(5,'Delivered'),(6,'Success'),(7,'Failed');
/*!40000 ALTER TABLE `transaction_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_detail`
--

DROP TABLE IF EXISTS `user_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `phone_number` int NOT NULL,
  `address` varchar(150) NOT NULL,
  `kelurahan` varchar(100) NOT NULL,
  `kecamatan` varchar(100) NOT NULL,
  `kota` varchar(100) NOT NULL,
  `provinsi` varchar(100) NOT NULL,
  `url_profile_image` varchar(100) DEFAULT NULL,
  `users_id` int NOT NULL,
  PRIMARY KEY (`id`,`users_id`),
  KEY `fk_user_detail_users_idx` (`users_id`),
  CONSTRAINT `fk_user_detail_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_detail`
--

LOCK TABLES `user_detail` WRITE;
/*!40000 ALTER TABLE `user_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` varchar(45) NOT NULL,
  `isVerified` int NOT NULL DEFAULT '0',
  `otp` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_product` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_whistlist_users1_idx` (`id_user`),
  KEY `fk_whistlist_products1_idx` (`id_product`),
  CONSTRAINT `fk_whistlist_products1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`),
  CONSTRAINT `fk_whistlist_users1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-19 13:22:52

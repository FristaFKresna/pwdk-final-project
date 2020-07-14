use TokoBuku;


select * from users;
select * from user_detail;

-- USER INFO DETAIL -- 
select u.id, u.username, u.email, u.role, u.isVerified, 
ud.first_name, ud.last_name, ud.phone_number, ud.address, ud.kelurahan, 
ud.kecamatan, ud.kota, ud.provinsi, ud.url_profile_image from users u
join user_detail ud on u.id = ud.users_id;
-- USER INFO DETAIL --    

select * from products;
select * from product_images;
select * from category;
select * from authors;
select * from publishers;

select * from rating;
select * from transaction;
select * from transaction_detail;
select * from transaction_status;

select * from cart;
select * from wishlist;



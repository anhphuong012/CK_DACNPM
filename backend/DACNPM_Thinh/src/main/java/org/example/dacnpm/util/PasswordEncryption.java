package org.example.dacnpm.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
public class PasswordEncryption {
	public static String hashPassword(String password) {
        try {
            // Tạo đối tượng MessageDigest với thuật toán SHA-256
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            
            // Tạo salt ngẫu nhiên
            byte[] salt = generateSalt();
            
            // Thêm salt vào mật khẩu
            md.update(salt);
            
            // Băm mật khẩu
            byte[] hashedPassword = md.digest(password.getBytes());
            
            // Kết hợp salt và hash thành một chuỗi duy nhất
            byte[] saltedHashedPassword = new byte[salt.length + hashedPassword.length];
            System.arraycopy(salt, 0, saltedHashedPassword, 0, salt.length);
            System.arraycopy(hashedPassword, 0, saltedHashedPassword, salt.length, hashedPassword.length);
            
            // Mã hóa base64 để chuyển thành chuỗi có thể đọc được
            return Base64.getEncoder().encodeToString(saltedHashedPassword);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    // Hàm tạo salt ngẫu nhiên
    private static byte[] generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }

    // Hàm kiểm tra mật khẩu
    public static boolean checkPassword(String password, String storedHashedPassword) {
        try {
            // Giải mã base64 để lấy mảng byte
            byte[] saltedHashedPassword = Base64.getDecoder().decode(storedHashedPassword);
            
            // Tách salt và hash từ mảng byte
            byte[] salt = new byte[16];
            byte[] hashedPassword = new byte[saltedHashedPassword.length - salt.length];
            System.arraycopy(saltedHashedPassword, 0, salt, 0, salt.length);
            System.arraycopy(saltedHashedPassword, salt.length, hashedPassword, 0, hashedPassword.length);
            
            // Tạo hash mới từ mật khẩu và salt
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt);
            byte[] newHashedPassword = md.digest(password.getBytes());
            
            // So sánh hash mới với hash lưu trữ
            for (int i = 0; i < newHashedPassword.length; i++) {
                if (newHashedPassword[i] != hashedPassword[i]) {
                    return false;
                }
            }
            return true;
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

}

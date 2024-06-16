package org.example.dacnpm.model;

import java.util.Date;
import java.util.Properties;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendEmail {
	static final String from = "phanb4906@gmail.com";
	static final String password = "eocb jsok avgt gnmo";

	public static void sendMail(String addressTo, String title, String message) {
		Properties props = new Properties();
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.setProperty("mail.smtp.ssl.protocols", "TLSv1.2");

		Authenticator auth = new Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(from, password);
			}
		};

		Session session = Session.getInstance(props, auth);

		MimeMessage msg = new MimeMessage(session);
		try {
			msg.addHeader("Content-type", "text/HTML; charset=UTF-8");
			msg.setFrom(new InternetAddress(from, "Thông Bao Đat Lich Kham Benh"));
			msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(addressTo, false));
			msg.setSubject(title);
			msg.setSentDate(new Date());
			msg.setText(message, "UTF-8");
			Transport.send(msg);
		} catch (MessagingException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		String text = "Đặt lich kham benh thanh cong \n" +
				"kinh gui: "+"anh/chi" +
				"\nma so: "+"87182" +
				"\nthoi gian: " + "09:00:00" +" ngay " +"19/6/2024"+
				"\nbac si: " +"Phuong";
		sendMail("huuthinh19593@gmail.com","Thành công", text);
	}
}
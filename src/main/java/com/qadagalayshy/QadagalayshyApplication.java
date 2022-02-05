package com.qadagalayshy;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.qadagalayshy.entities.Role;
import com.qadagalayshy.entities.User;
import com.qadagalayshy.repositories.RoleRepository;
import com.qadagalayshy.services.UserService;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class QadagalayshyApplication {

	public static void main(String[] args) {
		SpringApplication.run(QadagalayshyApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	CommandLineRunner run(UserService userService, RoleRepository roleRepository) {
		return (args) -> {
			Role admin = new Role(null, "Руководитель");
			Role manager = new Role(null, "Менеджер");
			Role assistant = new Role(null, "Помощник");

			List<Role> roles = new ArrayList<>(Arrays.asList(admin, manager, assistant));

			roleRepository.saveAll(roles);

			Role role = roleRepository.findById(3L).orElse(null);

			User user = User.builder()
				.username("zhoma")
				.firstName("Жомартхан")
				.lastName("Талғатұлы")
				.password("12345")
				.roles(roles)
				.build();

			userService.save(user);
		};
	}
}

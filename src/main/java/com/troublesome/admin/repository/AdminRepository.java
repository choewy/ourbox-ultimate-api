package com.troublesome.admin.repository;

import com.troublesome.admin.domain.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
  Admin save(Admin admin);

  Optional<Admin> findById(Long id);

  Optional<Admin> findByEmail(String email);
}

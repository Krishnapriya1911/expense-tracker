package com.spendwise.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spendwise.backend.entity.Build;

@Repository
public interface BuildRepository extends JpaRepository<Build, Long> {

}
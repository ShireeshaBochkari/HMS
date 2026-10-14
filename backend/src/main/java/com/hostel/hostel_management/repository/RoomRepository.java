
package com.hostel.hostel_management.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hostel.hostel_management.entity.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {

    @EntityGraph(attributePaths = "amenities")
    @Override
    Optional<Room> findById(Long id);

    @EntityGraph(attributePaths = "amenities")
    @Override
    List<Room> findAll();

    @EntityGraph(attributePaths = "amenities")
    Optional<Room> findByRoomNumber(String roomNumber);

    @EntityGraph(attributePaths = "amenities")
    List<Room> findByStatus(String status);
}

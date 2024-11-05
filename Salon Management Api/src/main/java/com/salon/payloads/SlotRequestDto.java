package com.salon.payloads;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class SlotRequestDto {

    private Integer salonId;
    private Integer serviceId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    // Getters and Setters
}

package com.salon.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    
    @NotEmpty
    private String name;
    
    @NotEmpty
    private String description;
    
    @NotNull
    private BigDecimal price;
    
    @NotEmpty
    private String category;
    
    @NotNull
    private Integer requiredTime; // Time in minutes, for example

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "salon_id", nullable = false)
    private Salon salon;
}

package com.back.back.data.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;


import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_number")
    private Integer commentNumber;


    @NotNull
    @Column(name = "comment_content")
    private String commentContent;

    @NotNull
    @Column(name = "user_email")
    private String userEmail;

    @NotNull
    @Column(name = "board_number")
    private Integer boardNumber;

    @NotNull
    @Column(name = "write_datetime")
    private Date writeDatetime;

    @NotNull
    @Column(name = "user_nickname")
    private String userNickname;

}

package com.iamneo.skg.model.enumerated;

import static com.iamneo.skg.model.enumerated.Permission.ADMIN_CREATE;
import static com.iamneo.skg.model.enumerated.Permission.ADMIN_DELETE;
import static com.iamneo.skg.model.enumerated.Permission.ADMIN_READ;
import static com.iamneo.skg.model.enumerated.Permission.ADMIN_UPDATE;
import static com.iamneo.skg.model.enumerated.Permission.STUDENT_CREATE;
import static com.iamneo.skg.model.enumerated.Permission.STUDENT_DELETE;
import static com.iamneo.skg.model.enumerated.Permission.STUDENT_READ;
import static com.iamneo.skg.model.enumerated.Permission.STUDENT_UPDATE;
import static com.iamneo.skg.model.enumerated.Permission.TRAINER_CREATE;
import static com.iamneo.skg.model.enumerated.Permission.TRAINER_DELETE;
import static com.iamneo.skg.model.enumerated.Permission.TRAINER_READ;
import static com.iamneo.skg.model.enumerated.Permission.TRAINER_UPDATE;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Role {
        ADMIN(Set.of(
                        ADMIN_READ,
                        ADMIN_CREATE,
                        ADMIN_UPDATE,
                        ADMIN_DELETE,
                        TRAINER_READ,
                        TRAINER_CREATE,
                        TRAINER_UPDATE,
                        TRAINER_DELETE,
                        STUDENT_READ,
                        STUDENT_CREATE,
                        STUDENT_UPDATE,
                        STUDENT_DELETE)),
        TRAINER(Set.of(
                        TRAINER_READ,
                        TRAINER_CREATE,
                        TRAINER_UPDATE,
                        TRAINER_DELETE)),
        STUDENT(Set.of(
                        STUDENT_READ,
                        STUDENT_CREATE,
                        STUDENT_UPDATE,
                        STUDENT_DELETE));

        @Getter
        private final Set<Permission> permissions;

        public List<SimpleGrantedAuthority> getAuthority() {
            List<SimpleGrantedAuthority> authorities = new ArrayList<>();

            for (Permission permission : getPermissions()) {
                authorities.add(new SimpleGrantedAuthority(permission.getPermission()));
            }

            authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
            return authorities;
        }

    
}

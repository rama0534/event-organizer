package org.rama.eventorg.controller;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

import org.rama.eventorg.model.Group;
import org.rama.eventorg.model.GroupRepository;
import org.rama.eventorg.model.User;
import org.rama.eventorg.model.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@Slf4j
public class GroupController {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    public GroupController(GroupRepository groupRepository, UserRepository userRepository) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/groups")
    Collection<Group> groups(Principal principal) {
        return groupRepository.findAllByUserId(principal.getName());
    }
    @GetMapping("/group/{id}")
    ResponseEntity<?> getGroup(@PathVariable Long id) {
        Optional<Group> group = groupRepository.findById(id);
        return group.map(res -> ResponseEntity.ok() .body(res))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/group")
    ResponseEntity<Group> createGroup(@Valid @RequestBody Group group, @AuthenticationPrincipal OAuth2User principal ) throws URISyntaxException {
        log.info("Requested to create a group:{}", group);

        Map<String, Object> details = principal.getAttributes();
        String userId = details.get("sub").toString();

        // check to see if user already exists
        Optional<User> user = userRepository.findById(userId);
        group.setUser(user.orElse(new User(userId,
                details.get("name").toString(), details.get("email").toString())));

        Group result = groupRepository.save(group);
        return ResponseEntity.created(new URI("/api/groups" + result.getId())).body(result);
    }

    @PutMapping("/group/{id}")
    ResponseEntity<Group> updateGroup(@Valid @RequestBody Group group) {
        log.info("Requested to Update group:{}", group);
        Group result = groupRepository.save(group);
        return ResponseEntity.ok().body(result);

    }

    @DeleteMapping("/group/{id}")
    ResponseEntity<?> deleteGroup(@PathVariable Long id) {
        log.info("Requested to delete group with id:{}", id);
        groupRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

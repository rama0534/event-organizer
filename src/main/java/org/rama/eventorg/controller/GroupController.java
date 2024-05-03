package org.rama.eventorg.controller;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.rama.eventorg.model.Group;
import org.rama.eventorg.model.GroupRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@Slf4j
public class GroupController {

    private final GroupRepository repository;

    public GroupController(GroupRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/groups")
    Collection<Group> groups() {
        return repository.findAll();
    }
    @GetMapping("/group/{id}")
    ResponseEntity<?> getGroup(@PathVariable Long id) {
        Optional<Group> group = repository.findById(id);
        return group.map(res -> ResponseEntity.ok() .body(res))
                                        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/group")
    ResponseEntity<Group> createGroup(@Valid @RequestBody Group group) throws URISyntaxException {
        log.info("Requested to create a group:{}", group);
        Group result = repository.save(group);
        return ResponseEntity.created(new URI("/api/groups" + result.getId())).body(result);
    }

    @PutMapping("/group/{id}")
    ResponseEntity<Group> updateGroup(@Valid @RequestBody Group group) {
        log.info("Requested to Update group:{}", group);
        Group result = repository.save(group);
        return ResponseEntity.ok().body(result);

    }

    @DeleteMapping("/group/{id}")
    ResponseEntity<?> deleteGroup(@PathVariable Long id) {
        log.info("Requested to delete group with id:{}", id);
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

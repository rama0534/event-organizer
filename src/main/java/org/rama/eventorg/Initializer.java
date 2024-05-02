package org.rama.eventorg;

import org.rama.eventorg.model.Event;
import org.rama.eventorg.model.Group;
import org.rama.eventorg.model.GroupRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collections;
import java.util.stream.Stream;

@Component
public class Initializer implements CommandLineRunner {

    private final GroupRepository repository;

    public Initializer(GroupRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        Stream.of("Melbourne", "Sydney", "Dallas", "Hyderabad")
                .forEach(name -> repository.save(new Group(name)));
        Group djug = repository.findByName("Melbourne");
        Event e = Event.builder()
                        .title("Raspberry Pi")
                        .description("Benefits of Networking")
                        .date(Instant.now())
                        .build();
        djug.setEvents(Collections.singleton(e));
        repository.save(djug);
        repository.findAll().forEach(System.out::println);

    }
}

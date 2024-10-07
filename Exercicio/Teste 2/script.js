spring.datasource.url=jdbc:mysql://localhost:3306/game_marketplace
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update

@Entity
public class Game {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  private String name;
  private String description;
  private Double price;
  
  // Getters and setters
}
public interface GameRepository extends JpaRepository<Game, Long> {
  
    List<Game> findByName(String name);
  }

  @Service
public class GameService {
  
  @Autowired
  private GameRepository gameRepository;
  
  public List<Game> getGames() {
    return gameRepository.findAll();
  }
  
  public Game getGame(Long id) {
    return gameRepository.findById(id).orElseThrow();
  }
  
  public void saveGame(Game game) {
    gameRepository.save(game);
  }
}


@RestController
@RequestMapping("/api/games")
public class GameController {
  
  @Autowired
  private GameService gameService;
  
  @GetMapping
  public List<Game> getGames() {
    return gameService.getGames();
  }
  
  @GetMapping("/{id}")
  public Game getGame(@PathVariable Long id) {
    return gameService.getGame(id);
  }
  
  @PostMapping
  public void saveGame(@RequestBody Game game) {
    gameService.saveGame(game);
  }
}

<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>


<!-- games.html -->
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
  <title>Games</title>
</head>
<body>
  <h1>Games</h1>
  <ul th:each="game : ${games}">
    <li th:text="${game.name}">Game name</li>
  </ul>
</body>
</html>


@GetMapping
public String getGames(Model model) {
  List<Game> games = gameService.getGames();
  model.addAttribute("games", games);
  return "games";
}
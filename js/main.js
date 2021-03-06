var MedievalGame = MedievalGame || {};

var game = new Phaser.Game("100%", "100%", Phaser.AUTO);
game.state.add("BootState", new MedievalGame.BootState());
game.state.add("LoadingState", new MedievalGame.LoadingState());
game.state.add("GameState", new MedievalGame.TiledState());
game.state.start("BootState", true, false, "assets/levels/level1_data.json");

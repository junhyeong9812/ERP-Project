package stockMain;

import java.net.URL;

import cafe.url.URLService;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import stockController.Controller;



public class MainClass extends Application{
	@Override
	public void start(Stage arg0) throws Exception {
		
//		System.out.println(getClass().getResource(""));
//		System.out.println(Paths.get("").toAbsolutePath().toString());
//		System.out.println
//		("file:/" +((Paths.get("").toAbsolutePath().toString())+"/bin/stock_control/stock.fxml"));
		
		URL url = new URL(URLService.fxPath + "stock_fxml/stock.fxml");
		
		
		FXMLLoader loader = new FXMLLoader(url);
		Parent root = loader.load();
		
		Controller ctrl = loader.getController();
		ctrl.setRoot(root);

		Scene scene = new Scene(root);
		arg0.setScene(scene);		
		arg0.show();
	
	}
	public void viewFx(Parent root) {
		Stage stockStage = (Stage)root.getScene().getWindow();
		try {
		
			URL url = new URL(URLService.fxPath + "stock_fxml/stock.fxml");
			FXMLLoader loader = new FXMLLoader(url);
			
			root = loader.load();
//			System.out.println("root확인 :"+root);
			
			Controller ctrl = loader.getController();
			ctrl.setRoot(root);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
//		System.out.println("roott : " + root) ;
		Scene scene = new Scene(root);
		stockStage.setScene(scene);
		stockStage.show();
	}
	
	
public static void main(String[] args) {
	launch(args);
}
}


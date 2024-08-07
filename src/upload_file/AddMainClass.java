package stockAdd;

import java.net.URL;

import cafe.url.URLService;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class AddMainClass {
	public void viewFx(Parent root) { //물품 추가창 열기
		System.out.println( "root : "+root);
		Stage AddStage = (Stage)root.getScene().getWindow();
		try {
		
			URL url = new URL(URLService.fxPath + "stockAdd/stockAdd.fxml");
			FXMLLoader loader = new FXMLLoader(url);
//			System.out.println(url);
			
			root = loader.load();
//			System.out.println("root확인 :"+root);
			
			Controller ctrl = loader.getController();
			ctrl.setRoot(root);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
//		System.out.println("roott : " + root) ;
		Scene scene = new Scene(root);
		AddStage.setScene(scene);
		AddStage.show();
	}
}

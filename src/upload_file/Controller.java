package stockAdd;

import java.net.URL;
import java.util.ResourceBundle;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.control.TextField;

public class Controller implements Initializable{
	@FXML public TextField stockAdd; //** public 잊지말고 꼭 넣기....
	@FXML public TextField num;
	
	Parent root;
	addServiceImpl sv;
	
	public void setRoot(Parent root) { 
		this.root = root;
	}
	
	
	@Override
	public void initialize(URL arg0, ResourceBundle arg1) {
		sv = new addServiceImpl();
	}
	
	public void addFunc() {
		System.out.println("추가 버튼 클릭");
		sv.addFunc(stockAdd, num);
	}
	
	public void cancellFunc() {
		sv.cancellFunc(root);
	}
	
	
}

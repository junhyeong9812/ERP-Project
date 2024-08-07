package stockAdd;

import javafx.fxml.FXML;
import javafx.scene.Parent;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.TextField;
import javafx.stage.Stage;
import menu.dto.MenuDTO;
import stockMain.MainClass;

public class addServiceImpl implements serviceAdd{
	TextField stockAdd, num;

	addDAO dao ;
	Parent root;
	
	public addServiceImpl() {
		dao = new addDAO();
	}
	
	public void setRoot(Parent root) {
		this.root = root;
	}
	
//	public void dto() {
//		
//		stockAdd.getText();
//		num.getText();
//	}
	
	@Override
	public void cancellFunc(Parent root) {
//		System.out.println("rrr" + root); 
		System.out.println("창닫기");
		MainClass sm = new MainClass();
		sm.viewFx(root);
//		Stage stage = (Stage)root.getScene().getWindow(); 
//		stage.close();
	}

	
	public void addFunc(TextField stockAdd, TextField num) {
		System.out.println("목록추가 버튼");
		System.out.println("name : " +stockAdd.getText());
		System.out.println("num : " +num.getText());
		MenuDTO dt = dao.getMenu(stockAdd.getText());
		
		Alert alert = new Alert(AlertType.INFORMATION);
		String msg = null;
		if (dt == null) {
			msg = "해당 메뉴명이 존재하지 않습니다.";
		} else {
			int a = dao.addFun(num.getText(), dt.getProductid());
			System.out.println("  ----  : " + a);
			msg = stockAdd.getText() + " 메뉴가 " + num.getText() + "잔 추가 되었습니다.";
		}
		alert.setContentText(msg);
		alert.show();
//		Integer price = dt.getPrice() * Integer.parseInt(num.getText());
		
		
//		addDTO dto = new addDTO(dt.getProductid(), stockAdd.getText(), dt.getCoffee_type(), 
//				num.getText(), price.toString());

	}
	
}

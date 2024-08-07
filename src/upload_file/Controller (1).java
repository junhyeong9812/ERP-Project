package stockController;

import java.net.URL;
import java.nio.file.Paths;
import java.util.ResourceBundle;

import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.control.ListView;
import stockService.Serviece;
import stockService.ServieceImpl;

public class Controller implements Initializable{
	@FXML public ListView<String> listView;
	
	Parent root;
	ServieceImpl ss;
	Serviece si;

	ObservableList<String> area; //observlist를 사용해저 area에 저장한다.
	String path;
	
	public void setRoot(Parent root) { 
		this.root = root;
	}
	
	@Override
	public void initialize(URL arg0, ResourceBundle arg1) {
		ss = new ServieceImpl();
		System.out.println("초기화 메소드");
	}
	public void stockAddFunc() {
	System.out.println("물품 추가 창띄우기 버튼");
	ss.stockAddFunc(root);
		
	}
	public void cancelFunc() {
		System.out.println("물품 목록 창 닫기");
//		System.out.println("root : "+ root);
		ss.cancelFunc(root);
	}
	public void searchFunc() {
		System.out.println("물품 검색 버튼");
		System.out.println();

		
		
	}
	public void residuumFunc() {
		System.out.println("재고 갯수 버튼");
	}
	
	public void lessFunc() {
		System.out.println("재고 10개 미만 버튼 클릭");
	}
	
	public void changeFunc() {
	System.out.println("재고 물품 목록 수정 버튼");
}

	public void deleteFunc() {
		System.out.println("재고 물품 목록 삭제 버튼");
	}

}

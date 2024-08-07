package stockAdd;

import javafx.scene.Parent;
import javafx.scene.control.TextField;

public interface serviceAdd {
	public void cancellFunc(Parent root);
	public void addFunc(TextField stockAdd,TextField num);
	public void setRoot(Parent root)
	;
}

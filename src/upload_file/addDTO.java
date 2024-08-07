package stockAdd;

public class addDTO {
private String productid, product, coffee_type, cnt, price;
	
	public addDTO(String productid, String product, String coffee_type, String cnt, String price) {
		this.productid = productid ; this.product = product; this.coffee_type = coffee_type;
		this.cnt = cnt;
		this.price = price;
	}

	public String getProductid() {
		return productid;
	}

	public void setProductid(String productid) {
		this.productid = productid;
	}

	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	public String getCoffee_type() {
		return coffee_type;
	}

	public void setCoffee_type(String coffee_type) {
		this.coffee_type = coffee_type;
	}

	public String getCnt() {
		return cnt;
	}

	public void setCnt(String cnt) {
		this.cnt = cnt;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}



	
	

}

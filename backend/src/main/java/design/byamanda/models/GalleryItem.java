package design.byamanda.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class GalleryItem {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Column
  private String title;

  @Column 
  private boolean inStock;

  @Column 
  private int width;

  @Column 
  private int height;

  @Column 
  private String medium;

  public long getId() { return id; }
  public void setID(long id) { this.id = id; }

  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }

  public boolean isInStock() { return inStock; }
  public void setInStock(boolean stock) { this.inStock = stock; }

  public int getWidth() { return width; }
  public void setWidth(int width) { this.width = width; }

  public int getHeight() { return height; }
  public void setHeight(int height) { this.height = height; }

  public String getMedium() { return medium; }
  public void setMedium(String medium) { this.medium = medium; }
}
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase.util";
import { columns } from "./config";

const UseProductsData = () => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const snapshot = await getDocs(collection(db, "products-inventory"));
      const listProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      listProducts.sort((a, b) => a.itemsItemId - b.itemsItemId);
      setProductsData(listProducts);
    };
    getProducts();
  }, []);
  return [productsData, setProductsData];
};

export default function Products() {
  // eslint-disable-next-line
  const [products, setProducts] = UseProductsData();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const deleteProduct = ({ id, name }) => {
    console.log(id, name);
    const productRef = doc(db, "products-inventory", id);

    deleteDoc(productRef)
      .then(() => {
        alert(`Product ${name} eliminado correctamente`);
        console.log(`Deleted ${id}`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{ padding: "2vw" }}>
      <Paper style={{ borderRadius: "12px" }}>
        <TableContainer style={{ borderRadius: "12px" }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(({ label, minWidth, maxWidth }) => (
                  <TableCell
                    style={{
                      minWidth: minWidth,
                      maxWidth: maxWidth,
                      backgroundColor: "#b53836",
                      color: "white",
                    }}
                  >
                    {label.toUpperCase()}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(
                ({
                  category,
                  itemNumber,
                  itemsItemId,
                  name,
                  unitPrice,
                  id,
                }) => {
                  return (
                    <TableBody>
                      <TableRow>
                        <TableCell>{itemsItemId}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>{category}</TableCell>
                        <TableCell>{unitPrice}</TableCell>
                        <TableCell>{itemNumber}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() =>
                              deleteProduct({ id: id, name: name })
                            }
                          >
                            Eliminar
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  );
                }
              )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

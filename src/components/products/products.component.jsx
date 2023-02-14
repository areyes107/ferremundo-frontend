import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
import { useSearchParams } from "react-router-dom";
import { db } from "../../firebase/firebase.util";
import SearchBox from "../search-box/search-box.component";
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

const Filters = {
  NAME: "name",
  CODE: "itemNumber",
};

export default function Products() {
  // eslint-disable-next-line
  const [products, setProducts] = UseProductsData();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchField, setSearchField] = useState(searchParams.get("query"));
  const [isSearchDisabled, setSearchDisabled] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(
    searchParams.get("filter")
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setSearchParams(
      new URLSearchParams({ filter: currentFilter, query: newQuery })
    );
  };

  const deleteProduct = ({ id, name }) => {
    console.log(id, name);
    const productRef = doc(db, "products-inventory", id);

    deleteDoc(productRef)
      .then(() => {
        alert(`Product ${name} eliminado correctamente`);
        console.log(`Deleted ${id}`);
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

  const ShowFilterContent = (searchField) => {
    let filteredProducts = [];
    if (!searchField) return products;

    filteredProducts = products.filter(
      (product) =>
        product[currentFilter] &&
        product[currentFilter]
          .toLowerCase()
          .includes(searchField.toLocaleLowerCase())
    );
    return filteredProducts;
  };

  const onFilterSelection = (event) => {
    const selectedFilter = event.target.value;
    setSearchParams(
      new URLSearchParams({ filter: selectedFilter, query: searchField })
    );
    setCurrentFilter(selectedFilter);
    setSearchDisabled(false);
  };

  return (
    <div style={{ padding: "2vw" }}>
      <div>
        <FormControl
          style={{ minWidth: 300, marginBottom: "1vh", borderRadius: "12px" }}
        >
          <InputLabel>Tipo(código o nombre)</InputLabel>
          <Select
            onChange={onFilterSelection}
            value={currentFilter}
            variant="standard"
            style={{ borderRadius: "12px" }}
          >
            <MenuItem value={Filters.CODE}>Código</MenuItem>
            <MenuItem value={Filters.NAME}>Nombre</MenuItem>
          </Select>
        </FormControl>
        <SearchBox
          value={searchField}
          setParentInput={setSearchField}
          isDisabled={isSearchDisabled}
          onChange={handleChange}
        />
      </div>
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

            {ShowFilterContent(searchField)
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
                            variant="contained"
                            color="primary"
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
          count={ShowFilterContent(searchField).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

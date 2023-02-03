import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase.util";

export function Home() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userProducts, setUserProducts] = useState([]);

  const destructureReference = async (references) => {
    const [reference] = references;
    return await Promise.all(
      reference.map(({ parent, id }) => {
        const docRef = doc(db, parent.id, id);
        const docSnap = getDoc(docRef);
        return docSnap;
      })
    );
  };

  const getDataFromReferences = async (references) => {
    if (!Boolean(references.length)) return [];

    const rawEntitiesData = await destructureReference(references);

    const entitiesData = rawEntitiesData.map((rawEntity) => {
      return {
        ...rawEntity.data(),
        path: rawEntity.ref.path,
        id: rawEntity.id,
      };
    });

    return entitiesData;
  };

  useEffect(() => {
    const getUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const listProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      listProducts.sort((a, b) => (a.product_name > b.product_name ? 1 : -1));
      setUsers(listProducts);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const listProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      listProducts.sort((a, b) => (a.product_name > b.product_name ? 1 : -1));
      setProducts(listProducts);
    };
    getProducts();
  }, []);

  useEffect(() => {
    getDataFromReferences(users.map(({ cart }) => cart)).then((item) =>
      setUserProducts(item)
    );
    // eslint-disable-next-line
  }, [users]);

  return (
    <div style={{ padding: "10vh" }}>
      <div>
        <h2>Products</h2>
        {products.map(
          ({
            id,
            product_name,
            product_price,
            product_description,
            product_category,
          }) => {
            return (
              <li key={id}>
                <ul>{id}</ul>
                <ul>{product_name}</ul>
                <ul>{product_description}</ul>
                <ul>Q{product_price}</ul>
                <ul>{product_category}</ul>
              </li>
            );
          }
        )}
      </div>
      <div>
        <h2>USERS</h2>
        {users.map(({ id, user_name, user_type }) => {
          return (
            <li key={id}>
              <ul>{id}</ul>
              <ul>{user_name}</ul>
              <ul>{user_type}</ul>
              <ul>{JSON.stringify(userProducts && userProducts)}</ul>
            </li>
          );
        })}
      </div>
    </div>
  );
}

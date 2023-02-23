import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase.util";

const UseUsersData = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const listUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      listUsers.sort((a, b) => (a.user_name > b.user_name ? 1 : -1));
      setUserData(listUsers);
    };
    getUsers();
  }, []);

  return [userData, setUserData];
};

export function Users() {
  // eslint-disable-next-line
  const [users, setUsers] = UseUsersData();
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
    getDataFromReferences(users.map(({ cart }) => cart)).then((item) =>
      setUserProducts(item)
    );
    // eslint-disable-next-line
  }, [users]);

  return (
    <div style={{ padding: "10vh" }}>
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

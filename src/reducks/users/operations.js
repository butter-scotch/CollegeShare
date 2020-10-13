import { push } from "connected-react-router";
import { signInAction, signOutAction } from "./actions";
import { auth, FirebaseTimestamp, db, storage } from "../../firebase/index";
import { saveSchools } from "../schools/operations";
import { addIconAction, deleteProductAction, deleteSellAction, fetchOrdersHistoryAction, fetchProductsInFavoriteAction, fetchSellsAction } from '../../reducks/users/actions'

const usersRef = db.collection("users");

export const addIcon = (image) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid

    usersRef.doc(uid).get()
      .then(snapshot => {
        const data = snapshot.data()

        const userData = {
          icon: image,
          isSignedIn: true,
          role: data.role,
          schoolname: data.schoolname,
          sid: data.sid,
          uid: data.uid,
          username: data.username
        }

        usersRef.doc(uid).set(userData, {merge: true})
          .then(() => {
            dispatch(addIconAction(userData))
          })

      })
  }
}

export const addProductToFavorite = (likedProduct) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    const sid = getState().users.sid
    const favoriteProducts = getState().users.favorite

    console.log(likedProduct.productId)

    const nextProducts = favoriteProducts.filter(product => product.productId !== likedProduct.productId)

    console.log(nextProducts)
    console.log(favoriteProducts)

    if (favoriteProducts.length !== nextProducts.length) {
      dispatch(push('/' + sid + '/' + uid + '/favorite'))
    } else {
      const favoriteRef = db.collection('users').doc(uid).collection('favorite').doc()
      likedProduct['favoriteId'] = favoriteRef.id
      await favoriteRef.set(likedProduct)
      dispatch(push('/' + sid + '/' + uid + '/favorite'))
    }
    
  }
}


export const fetchOrderHistory = () => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    const list = []

    db.collection('users').doc(uid).collection('orders')
      .orderBy('updated_at', 'desc')
      .get()
      .then((snapshots) => {
        snapshots.forEach(snapshot => {
          const data = snapshot.data()
          list.push(data)
        })
        dispatch(fetchOrdersHistoryAction(list))
      })
  }
}

export const fetchProductsInFavorite = (products) => {
  return async (dispatch) => {
    dispatch(fetchProductsInFavoriteAction(products))
  }
}

export const fetchSells = () => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    usersRef.doc(uid).collection('sells').orderBy('updated_at', 'desc').get()
      .then(snapshots => {
        const sellsList = []
        snapshots.forEach(snapshot => {
          const sell = snapshot.data()
          sellsList.push(sell)
        })
        dispatch(fetchSellsAction(sellsList))
      })
  }
}


export const listenAuthState = () => {
  return async (dispatch, getState) => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;

        usersRef
          .doc(uid)
          .get()
          .then(snapshot => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                schoolname: data.schoolname,
                sid : data.sid,
                uid: uid,
                username: data.username,
              })
            );

            const sid = getState().users.sid

          });
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

export const removeProductFromSell = (sellid, id) => {
  return async(dispatch, getState) => {
    const uid = getState().users.uid
    const sid = getState().users.sid

    db.collection('users').doc(uid).collection('sells').doc(sellid).delete()
      .then(() => {
        const prevSells = getState().users.sells
        const nextSells = prevSells.filter(sell => sell.sellid !== sellid)
        dispatch(deleteSellAction(nextSells))

        console.log(prevSells)

        db.collection('schools').doc(sid).collection('products').doc(id).delete()
          .then(() => {
            const prevProducts = getState().schools.products
            const nextProducts = prevProducts.filter(product => product.id !== id)
            dispatch(deleteProductAction(nextProducts))

          }).catch((error) => {
            throw new Error(error)
          })
      }).catch((error) => {
        throw new Error(error)
      })
  }
}

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      alert("必須入力欄が未入力です。")
      return false
    } 
  
    const isValidEmailFormat = (email) => {
      const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return regex.test(email);
    };

    if (!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が間違っています。");
      return false;
    }
      
    return auth.sendPasswordResetEmail(email)
      .then(() => {
        alert("入力されたアドレスにパスワードリセット用のメールをお送りしました。")
        dispatch(push('./signin'))
      }).catch(() => {
        alert("パスワードリセットに失敗しました。")
      })
    
  }
}



export const signIn = (email, password) => {
  return async (dispatch, getState) => {

    if ((email === "") | (password === "")) {
      alert("必須項目が未入力です");
      return false;
    }

    const isValidEmailFormat = (email) => {
      const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return regex.test(email);
    };

    if (!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が間違っています。");
      return false;
    }

    return auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;

        usersRef
          .doc(uid)
          .get()
          .then(snapshot => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                schoolname: data.schoolname,
                sid : data.sid,
                uid: uid,
                username: data.username,
              })
            );

            const sid = getState().users.sid

            dispatch(push("/" + sid + '/' + uid));
          });
      }
    });
  };
};

export const signUp = (
  username,
  email,
  schoolname,
  password,
  confirmPassword
) => {
  return async (dispatch, getState) => {

    if (
      (username === "") |
      (email === "") |
      (schoolname === "") |
      (password === "") |
      (confirmPassword === "")
    ) {
      alert("必須項目が未入力です。");
      return false;
    }

    const isValidEmailFormat = (email) => {
      const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return regex.test(email);
    };

    if (!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が間違っています。もう1度お試しください。");
      return false;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう1度お試しください。");
      return false;
    }

    if (password.length <= 6) {
      alert("パスワードは6文字以上で入力してください。");
      return false;
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            icon: "",
            role: "customer",
            schoolname: schoolname,
            uid: uid,
            updated_at: timestamp,
            username: username,
          };

          const ref = db.collection('schools').doc()
          const sid = ref.id
          userInitialData.sid = sid
          // schoolsというコレクションの中にデータを入れる枠を作り、そこに自動採番されたIDを入れる

          usersRef
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              db.collection('schools').get()
                .then(snapshots => {
                  snapshots.forEach(snapshot => {
                    const school = snapshot.data()
                    if (school.schoolname === userInitialData.schoolname) {
                      const schoolid = school.sid
                      userInitialData.sid = schoolid
                    } 
                  })

                  usersRef.doc(uid).set(userInitialData)
                  dispatch(saveSchools(schoolname , userInitialData.sid))
                })
                
                // dispatch(saveSchools(schoolname ,sid))
            });
        }
      })
      .catch((error) => {
        alert("アカウント登録に失敗しました。もう一度お試しください。");
        throw new Error(error);
      });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut()
      .then(() => {
        dispatch(signOutAction())
        dispatch(push('/signin'))
      })
  }
}

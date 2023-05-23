import {put, takeEvery} from "redux-saga/effects";
import {toast} from "react-toastify";
import axiosApi from "../../axiosApi";
import {historyPush} from "../actions/historyActions";
import {
  clearCocktailRequest,
  createCocktailFailure,
  createCocktailRequest,
  createCocktailSuccess,
  publishCocktailRequest,
  publishCocktailFailure,
  publishCocktailSuccess,
  deleteCocktailRequest,
  deleteCocktailFailure,
  deleteCocktailSuccess,
  getCocktailsFailure,
  getCocktailsRequest,
  getCocktailsSuccess,
  getIdCocktailFailure,
  getIdCocktailRequest,
  getIdCocktailSuccess,
  getUserCocktailsFailure,
  getUserCocktailsRequest,
  getUserCocktailsSuccess,
  setRateFailure,
  setRateRequest,
  setRateSuccess, clearCocktailsRequest
} from "../actions/cocktailsActions";
import {toastDefaultOptions} from "../../config";

export function* createCocktail({payload: cocktailData}) {
    try {
        yield axiosApi.post('/cocktails', cocktailData);
        yield put(createCocktailSuccess());
        yield toast.success('Cocktail added successfully! Your cocktail is being reviewed by a moderator', toastDefaultOptions);
        yield put(historyPush('/'));
    } catch (e) {
        yield put(createCocktailFailure(e.response.data));
    }
}

export function* getCocktails() {
    try {
        const response = yield axiosApi.get('/cocktails');
        yield put(getCocktailsSuccess(response.data));
    } catch(e) {
        yield put(getCocktailsFailure(e.response.data));
    }
}

export function* getUserCocktails() {
  try {
    const response = yield axiosApi('/cocktails/user');
    yield put(getUserCocktailsSuccess(response.data));
  } catch(e) {
    yield put(getUserCocktailsFailure(e.response.data));
  }
}

export function* getCocktail({payload: id}) {
    try{
        const response = yield axiosApi.get(`/cocktails/${id}`);
        yield put(getIdCocktailSuccess(response.data));
    } catch(e){
        yield put(getIdCocktailFailure(e.response.data));
    }
}

export function* setRate({payload: cocktailData}) {
  try {
    yield axiosApi.put(`cocktails/rating/${cocktailData.id}`, {rating: cocktailData.rate});

    yield put(setRateSuccess());
    yield put(getIdCocktailRequest(cocktailData.id));
  } catch (e) {
    yield put(setRateFailure());
  }
}

export function* deleteCocktailSaga({payload: cocktailId}) {
    try {
        const response = yield axiosApi.delete(`/cocktails/delete/${cocktailId}`);
        yield put(deleteCocktailSuccess(response.data));
        yield toast.success('Cocktail successfully deleted!', toastDefaultOptions);
    } catch (e) {
        console.error(e);
        yield put(deleteCocktailFailure(e.response.data));
        yield toast.error('Something went wrong while deleting cocktail!');
    }
}

export function* publishCocktailSaga({payload: cocktailId}) {
    try {
        const response = yield axiosApi.put(`/cocktails/publish/${cocktailId}`);
        yield put(publishCocktailSuccess(response.data));
        yield toast.success('Cocktail successfully published!', toastDefaultOptions);
    } catch (e) {
        console.error(e);
        yield put(publishCocktailFailure(e.response.data));
        yield toast.error('Something went wrong while publishing cocktail!');
    }
}

export function* clearCocktailsSaga() {}
export function* clearCocktailSaga() {}

const cocktailsSagas = [
    takeEvery(createCocktailRequest, createCocktail),
    takeEvery(getCocktailsRequest, getCocktails),
    takeEvery(getUserCocktailsRequest, getUserCocktails),
    takeEvery(getIdCocktailRequest, getCocktail),
    takeEvery(setRateRequest, setRate),
    takeEvery(clearCocktailsRequest, clearCocktailsSaga),
    takeEvery(clearCocktailRequest, clearCocktailSaga),
    takeEvery(publishCocktailRequest, publishCocktailSaga),
    takeEvery(deleteCocktailRequest, deleteCocktailSaga),
];

export default cocktailsSagas;
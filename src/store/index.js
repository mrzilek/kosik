import { createStore } from "vuex";
import axios from "axios";
import { KOSIK_LS_KEY } from "@/constants/constants";

const urlKey = "LIVDSRZULELA";
const url = "https://g.tenor.com/v1";

const state = {
  searchResults: [],
  termsData: [],
};

const mutations = {
  setTermsData(state, data) {
    state.termsData = data;
  },
  setSearchResults(state, data) {
    state.searchResults = data;
  },
};

const actions = {
  getTermsData({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/trending_terms?key=${urlKey}`).then((response) => {
          commit("setTermsData", response.data.results);
          resolve();
        }).catch((e) => {
          reject(e);
        });
    });
  },
  searchTrends({ commit }, searchParams) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/search?key=${urlKey}&${searchParams}`).then((response) => {
          const newData = [];

          response.data.results.forEach((trendItem) => {
            const newDataObj = {
              id: trendItem.id,
              created: trendItem.created,
              description: trendItem.content_description,
              imageOptions: trendItem.media[0].gif,
              itemUrl: trendItem.itemurl,
            };

            newData.push(newDataObj);
          });

          // Save new data structure to LS
          localStorage.setItem(KOSIK_LS_KEY, JSON.stringify({
              data: newData,
              searchParams,
            })
          );

          commit("setSearchResults", newData);
          resolve();
        }).catch((e) => {
          reject(e.response.data.error.message || e.response.data.error);
        });
    });
  },
};

const getters = {
  getSearchData(state) {
    return state.searchResults;
  },
  getTermsData(state) {
    return state.termsData;
  },
};

export default createStore({
  state,
  getters,
  actions,
  mutations,
});

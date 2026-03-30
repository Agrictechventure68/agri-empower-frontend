/* ======================================================
   Agri_Empower Data Service Layer
   Local JSON Loader
   Ready for Backend API later
   ====================================================== */

const DataService = {

  async fetchJSON(path) {
    try {
      const res = await fetch(path);

      if (!res.ok) {
        throw new Error("Failed to load " + path);
      }

      return await res.json();

    } catch (error) {
      console.error("DataService Error:", error);
      return null;
    }
  },

  async loadEnterprise(category, topic, enterprise) {

    const path =
      `/data/learning/${category}/${topic}/${enterprise}.json`;

    console.log("📦 Loading:", path);

    return await this.fetchJSON(path);
  }

};

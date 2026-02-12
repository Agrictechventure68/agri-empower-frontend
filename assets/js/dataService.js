/* ======================================================
   Agri_Empower Data Service Layer
   Simulates Backend API (JSON-based)
   Ready for Supabase & Django Migration
   ====================================================== */

const DataService = {

  async fetchJSON(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load: ${path}`);
      }
      return await response.json();
    } catch (error) {
      console.error("DataService Error:", error);
      return null;
    }
  },

  async loadLearning(domain, category) {
    return await this.fetchJSON(
      `/data/learning/${domain}/${category}.json`
    );
  },

  async loadDiagnostic(domain, category) {
    return await this.fetchJSON(
      `/data/diagnostic/${domain}/${category}.json`
    );
  }

};

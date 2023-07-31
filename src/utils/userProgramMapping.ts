const mapDataToUser = async (data: any, user: any) => {
  function mapProgram(program: any) {
    program.is_visible = user.program_ids.includes(program.id);
  }

  function mapCity(city: any) {
    city.is_visible = user.city_ids.includes(city.id);
    city.program.forEach(mapProgram);
  }

  function mapRegion(region: any) {
    region.is_visible = user.region_ids.includes(region.id);
    region.city.forEach(mapCity);
  }

  function mapDivision(division: any) {
    division.is_visible = user.division_ids.includes(division.id);
    division.region.forEach(mapRegion);
  }

  data.forEach(mapDivision);
  data.user_id = user.user_id

  return data;
};

export { mapDataToUser };

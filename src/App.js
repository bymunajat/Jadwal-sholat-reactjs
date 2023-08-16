import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  FormControl,
  Grid,
  InputLabel,
  Box,
} from "@mui/material";

import Divider from "@mui/material/Divider";

function App() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [city, setCity] = useState("Indramayu");
  const [country, setCountry] = useState("Indonesia");
  const [locationInput, setLocationInput] = useState("");
  const [cityList, setCityList] = useState([
    { city: "Indramayu", country: "Indonesia" },
    { city: "Istanbul", country: "Turki" },
    { city: "Kairo", country: "Mesir" },
    { city: "Jakarta", country: "Indonesia" },
    { city: "Surabaya", country: "Indonesia" },
    { city: "Bandung", country: "Indonesia" },
    { city: "Medan", country: "Indonesia" },
    { city: "Semarang", country: "Indonesia" },
    { city: "Palembang", country: "Indonesia" },
    { city: "Makassar", country: "Indonesia" },
    { city: "Bekasi", country: "Indonesia" },
    { city: "Tangerang", country: "Indonesia" },
    { city: "Depok", country: "Indonesia" },
    { city: "Padang", country: "Indonesia" },
    { city: "Bandar Lampung", country: "Indonesia" },
    { city: "Bogor", country: "Indonesia" },
    { city: "Malang", country: "Indonesia" },
    { city: "Yogyakarta", country: "Indonesia" },
    { city: "Denpasar", country: "Indonesia" },
    { city: "Surakarta", country: "Indonesia" },
    { city: "Banjarmasin", country: "Indonesia" },
    { city: "Pekanbaru", country: "Indonesia" },
    { city: "Balikpapan", country: "Indonesia" },
    { city: "Cimahi", country: "Indonesia" },
    { city: "Pontianak", country: "Indonesia" },
    { city: "Manado", country: "Indonesia" },
    { city: "Jambi", country: "Indonesia" },
    // Tambahkan kota-kota lain sesuai kebutuhan Anda
  ]);

  const API_URL = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(API_URL);
        setPrayerTimes(response.data.data.timings);
      } catch (error) {
        console.error("Error fetching prayer times:", error.message);
      }
    }
    fetchData();
  }, [city, country,API_URL]);

  const fardPrayers = [
    "Fajr", // Shubuh
    "Dhuhr", // Dzuhur
    "Asr", // Ashar
    "Maghrib", // Maghrib
    "Isha", // Isya
  ];

  const englishToIndonesianMapping = {
    Fajr: "Subuh",
    Dhuhr: "Dzuhur",
    Asr: "Ashar",
    Maghrib: "Maghrib",
    Isha: "Isya",
  };

  const filteredPrayerTimes = Object.keys(prayerTimes)
    .filter((prayer) => fardPrayers.includes(prayer))
    .reduce((obj, key) => {
      obj[englishToIndonesianMapping[key]] = prayerTimes[key];
      return obj;
    }, {});

  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleLocationInputChange = (event) => {
    setLocationInput(event.target.value);
  };

  const handleLocationSubmit = () => {
    const selectedCity = cityList.find((item) => item.city === locationInput);
    if (selectedCity) {
      setCity(selectedCity.city);
      setCountry(selectedCity.country);
      console.log("selected",selectedCity)
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          width: "100%",
          marginBottom: "20px",
          backgroundColor: "#ffffff",
          textAlign: "center",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          style={{
            color: "#3f51b5",
            typography: "body2",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Waktu Sholat Fardhu untuk {city}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            color: "#757575",
            marginBottom: "5px",
          }}
        >
          <Divider className="custom-divider" />
          <Box fontWeight="bold" color="#3f51b5">
            {currentDate}
          </Box>
          <Box fontWeight="bold" color="#3f51b5">
            Waktu Sekarang :{" "}
            {new Date().toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Box>
        </Typography>

        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6}>
            <FormControl
              variant="outlined"
              style={{ width: "100%", m: 1, minWidth: 120 }}
              size="small"
            >
              <InputLabel id="city-label">Pilih Kota</InputLabel>
              <Select
                labelId="city-label"
                value={locationInput}
                onChange={handleLocationInputChange}
                label="Pilih Kota"
              >
                {cityList.map((item, index) => (
                  <MenuItem key={index} value={item.city}>
                    {item.city}, {item.country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLocationSubmit}
              style={{ width: "100%" }}
            >
              Ubah Lokasi
            </Button>
          </Grid>
        </Grid>
        <TableContainer
          component={Paper}
          style={{
            marginTop: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#3f51b5",
                    color: "#ffffff",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Sholat
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#3f51b5",
                    color: "#ffffff",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Waktu
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(filteredPrayerTimes).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell style={{ textAlign: "center" }}>
                    {new Date() < new Date(value) ? (
                      <strong>{key}</strong>
                    ) : (
                      key
                    )}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {new Date() < new Date(value) ? (
                      <strong>{value}</strong>
                    ) : (
                      value
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

export default App;

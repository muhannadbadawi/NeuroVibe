import { Button, Image, Text, View } from "react-native";
import { useHomeStyles } from "./use-home-styles";
import { TabsEnum } from "../../../enums/tabs-enum";

interface IProps{
  changeScreen: (tabName: TabsEnum) => void
}

const HomeScreen = ({changeScreen}:IProps) => {
  const { container, imageContainer, iconColor, title } =
    useHomeStyles();

  const cars = [
    {
      source: require("../../../assets/images/cars/car1.png"),
      description:
        "Porsche 911 GT3 RS: Track-ready supercar with precision engineering",
    },
    {
      source: require("../../../assets/images/cars/car2.png"),
       
      description:  "Tesla Model X: Innovative electric SUV with unique falcon-wing doors",
    },
    {
      source: require("../../../assets/images/cars/car3.png"),
      description:
        "BMW M3: Iconic sports sedan with unmatched performance",
    },
  ];

  return (
    <View style={container}>
      <Text style={title}>Home</Text>
      {cars.map((car, index) => (
        <View key={index} style={imageContainer}>
          <View style={{ width: "40%", height: 150 }}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              source={car.source}
            />
          </View>
          <View style={{ width: "60%", height: 150, justifyContent: "center" }}>
            <Text
              style={{
                textAlign: "auto",
                fontSize: 18,
                color: iconColor,
                paddingHorizontal: 10,
              }}
            >
              {car.description}
            </Text>
          </View>
        </View>
      ))}
      <Button title="Add Files" onPress={()=>changeScreen(TabsEnum.FilesUpload)}></Button>
    </View>
  );
};

export default HomeScreen;

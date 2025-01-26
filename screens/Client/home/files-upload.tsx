import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import FormData from "form-data";
import axios from "axios";
import { useSelector } from "react-redux";
import { uploadFilesRequist } from "../../../config/api";
import { TabsEnum } from "../../../enums/tabs-enum";
import { colors } from "../../../assets/colors/colors";

interface IProps {
  changeScreen: (tabName: TabsEnum) => void;
  changeResult: (imageResult: any) => void;
}

const FilesUploadScreen = ({ changeScreen, changeResult }: IProps) => {
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const user = useSelector((state: any) => state.user);

  const reset = () => {
    setFiles([]);
    setUploadStatus(null);
  };

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });

      if (result.assets) {
        setFiles([...files, result.assets[0]]);
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("id", user.id);
    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, {
        uri: file.uri,
        type: file.mimeType || "application/octet-stream",
        name: file.name,
      });
    });

    try {
      setUploading(true);
      setUploadStatus(null);
      const response = await uploadFilesRequist(formData);
      changeResult(response.data.result);
      changeScreen(TabsEnum.Result);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Files</Text>
      {uploading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity
            style={[styles.button, files.length > 2 && styles.buttonDisabled]}
            onPress={pickFile}
            disabled={files.length > 2}
          >
            <Text style={styles.buttonText}>Pick File</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, , files.length < 3 && styles.buttonDisabled]}
            onPress={handleUpload}
            disabled={files.length < 3}
          >
            <Text style={styles.buttonText}>Upload Files</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resetButton}
            disabled={files.length === 0}
            onPress={reset}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </>
      )}
      {uploadStatus && (
        <Text style={[styles.status, styles.success]}>{uploadStatus}</Text>
      )}
      {files.length > 0 && (
        <View style={styles.fileList}>
          {files.map((file, index) => (
            <Text key={index} style={styles.fileName}>
              {`File ${index + 1}: ${file.name}`}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop:50,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color:colors.text
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 75,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#b0b0b0",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  fileList: {
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  fileName: {
    fontSize: 14,
    marginVertical: 5,
    color:colors.text
  },
  resetButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  status: {
    marginTop: 10,
    fontSize: 16,
  },
  success: {
    color: "green",
  },
  error: {
    color: "red",
  },
});

export default FilesUploadScreen;

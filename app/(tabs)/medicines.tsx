import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ActivityIndicator, Button, Image, ScrollView, Text, View } from 'react-native';
import Tesseract from 'tesseract.js';

export default function MedicinesScreen() {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      extractText(uri);
    }
  };

  const extractText = async (uri) => {
    setLoading(true);
    try {
      const result = await Tesseract.recognize(uri, 'eng');
      setExtractedText(result.data.text);
    } catch (error) {
      console.error('OCR error:', error);
      setExtractedText('Failed to extract text.');
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Upload Prescription</Text>
      <Button title="Pick an image from gallery" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 300, height: 300, marginTop: 20 }} />
      )}
      {loading && <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />}
      {extractedText ? (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Extracted Text:</Text>
          <Text>{extractedText}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}
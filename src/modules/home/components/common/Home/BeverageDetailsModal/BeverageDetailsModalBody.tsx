import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button, Text, View, Image } from 'native-base';

import { normalize } from 'libs/utils/helpers';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'libs/utils/constants';

import { styles } from './styles';
import { boolean, string } from 'yup';

type Props = {
  title: string;
  description: string;
  imgUrl: string;
  isFavorite: boolean;
  toggleFavorite: () => void;
  addToOrder: () => void;
};

export const BeverageDetailsModalBody: FC<Props> = ({
  title,
  description,
  imgUrl,
  isFavorite,
  toggleFavorite,
  addToOrder,
}) => {
  const { t } = useTranslation();

  return (
    <View px={5}>
      <Image
        alt={title}
        source={{ uri: imgUrl }}
        alignSelf="center"
        size={300}
        mt={5}
        rounded="xl"
      />

      <View>
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="tertiary.600"
            textDecorationLine="underline"
          >
            {t('home:beverageDetails:description')}
          </Text>

          <TouchableOpacity onPress={toggleFavorite}>
            {isFavorite ? (
              <Icon name="star" color="orange" size={normalize(30)} />
            ) : (
              <Icon name="star-outline" size={normalize(30)} />
            )}
          </TouchableOpacity>
        </View>

        <Text fontSize="xl" fontWeight="bold">
          {description}
        </Text>
      </View>

      <Button
        variant="solid"
        rounded="full"
        w="full"
        onPress={addToOrder}
        alignSelf="flex-end"
        mt="10"
      >
        <Text color="white" fontWeight="bold" fontSize="xl">
          {t('home:beverageDetails:addToOrderBtn')}
        </Text>
      </Button>
    </View>
  );
};

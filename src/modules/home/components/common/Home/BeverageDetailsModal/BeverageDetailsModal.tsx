import React, { FC } from 'react';
import { Alert, Modal, SafeAreaView } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { useGlobalContext } from 'contexts/globalContext';
import { useFetchBeverageById } from 'hooks/home/beverages/useFetchBeverageById';
import { useToggleBeverageFavorite } from 'hooks/home/beverages/useToggleBeverageFavorite';
import { Queries, Screens } from 'libs/utils/constants';
import { showAvailableSoonAlert } from 'libs/utils/helpers';
import { Loading } from 'libs/components/layout/Loading';
import { BeverageDetailsModalHeader } from './BeverageDetailsModalHeader';
import { BeverageDetailsModalBody } from './BeverageDetailsModalBody';

import { styles } from './styles';

type Props = {
  beverageId: number | null;
  setBeverageId: (beverageId: number | null) => void;
};

export const BeverageDetailsModal: FC<Props> = ({
  beverageId,
  setBeverageId,
}) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const { user } = useGlobalContext();
  const queryClient = useQueryClient();
  const { isLoading, data, refetch, isRefetching } =
    useFetchBeverageById(beverageId);
  const { mutateAsync, isPending } = useToggleBeverageFavorite();

  const handleClose = (): void => setBeverageId(null);

  const showSignInAlert = (): void => {
    Alert.alert('', t('alerts:signIn:title'), [
      {
        text: t('links:signIn'),
        onPress() {
          setBeverageId(null);
          // @ts-ignore
          navigate(Screens.SIGN_IN_SCREEN);
        },
      },
      {
        text: t('links:cancel'),
        style: 'cancel',
      },
    ]);
  };

  const toggleFavorite = async (): Promise<void> => {
    if (user?.id) {
      await mutateAsync({
        beverageId: Number(data?.id),
        userId: Number(user?.id),
      });

      await refetch();

      await queryClient.invalidateQueries({
        queryKey: [Queries.FETCH_FAVORITES_BEVERAGES],
      });
    } else {
      showSignInAlert();
    }
  };

  const handleAddToOrder = (): void => {
    if (user?.id) {
      showAvailableSoonAlert();
    } else {
      showSignInAlert();
    }
  };

  return (
    <Modal
      visible={Boolean(beverageId)}
      onDismiss={handleClose}
      animationType="slide"
    >
      {(isPending || isRefetching) && (
        <Loading backgroundColor="rgba(0, 0, 0, 0.6)" h="full" />
      )}

      <SafeAreaView style={styles.flexContainer}>
        <BeverageDetailsModalHeader
          title={data?.title || t('home:beverageDetails:title')}
          onClose={handleClose}
        />

        {isLoading ? (
          <Loading backgroundColor="white" />
        ) : (
          <BeverageDetailsModalBody
            title={data?.title || ''}
            description={data?.description || '-'}
            imgUrl={data?.imgUrl || ''}
            isFavorite={Boolean(data?.isFavorite)}
            toggleFavorite={toggleFavorite}
            addToOrder={handleAddToOrder}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

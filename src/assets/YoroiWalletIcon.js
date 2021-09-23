// @flow

import React from 'react'
import Svg, {G, Path, Polygon} from 'react-native-svg'

import {COLORS} from '../styles/config'

type Props = {width?: number, height?: number, color?: string}

const YoroiWalletIcon = ({width = 210, height = 60, color = COLORS.WHITE}: Props) => (
  <Svg width={width} height={height} viewBox="0 0 210 60" xmlns="http://www.w3.org/2000/svg">
    <G id="logo-yoroi" fill="none">
      <G id="logo">
        <G id="Group">
          <Path
            d="M5.9107402,14.377557 L5.9107402,16.7289604 C5.9107402,17.4655446 5.9107402,18.230459 5.9107402,18.9670432 L5.9107402,21.2617862 C5.9107402,21.3184466 5.9107402,21.3751069 5.93702768,21.403437 C17.529807,30.0158062 29.0437239,38.6281753 40.6102157,47.2405444 L45.3156749,43.7276043 C32.1719342,33.9536986 19.0807684,24.208123 5.9107402,14.377557 Z"
            id="Shape"
            fill={color}
          />
          <Path
            d="M36.039823,10.5037768 C33.9475256,12.1040752 31.8552282,13.6461809 29.7629308,15.2464793 C29.4752399,15.4501537 29.2921638,15.47925 29.0044729,15.2464793 C26.4414086,13.2679286 23.8521906,11.2893778 21.2629725,9.31082708 C18.5691396,7.18679465 15.8753067,5.06276222 13.15532,2.96782613 C11.8737878,1.97855075 10.5922557,0.989275377 9.31072351,0 L0,0 C0.496920637,0.37825235 0.889226402,0.698312031 1.30768589,1.01837171 C3.73998163,2.88053713 6.17227738,4.77179888 8.60457313,6.63396429 C11.0107152,8.49612971 13.4168572,10.3582951 15.8229992,12.2204605 C18.0722189,13.9662406 20.3475924,15.741117 22.5968121,17.4868971 C24.741417,19.1453882 26.9121755,20.7747829 29.0567804,22.4623703 C29.2921638,22.6369483 29.4490861,22.6369483 29.6844696,22.4623703 C31.410615,21.1239389 33.1629141,19.8437002 34.9152131,18.5052688 C39.2044229,15.217383 43.4936326,11.9294972 47.7828423,8.67070772 C50.8951347,6.28480828 54.0335808,3.89890884 57.1458732,1.54210573 C57.7997161,1.04746805 58.4274054,0.552830358 59.107402,0.0290963346 L49.7705248,0.0290963346 C45.1936242,3.49156015 40.6428773,7.01221664 36.039823,10.5037768 Z"
            id="Shape"
            fill={color}
          />
          <Path
            d="M5.96268644,30.8090507 C5.93671332,30.8952298 5.9107402,30.9239562 5.9107402,30.9526826 C5.9107402,31.4410312 5.9107402,31.9006534 5.9107402,32.389002 L5.9107402,35.2616408 C5.9107402,36.1234324 5.9107402,36.985224 5.9107402,37.8182893 C5.9107402,37.875742 5.93671332,37.9044684 5.93671332,37.9619212 C13.5468377,43.7933779 21.1569621,49.5961082 28.8190327,55.4562912 C28.8190327,55.4562912 28.8450059,55.4562912 28.8450059,55.4562912 L33.4941945,51.8367664 C24.2737366,44.7988014 15.1311981,37.8182893 5.96268644,30.8090507 Z"
            id="Shape"
            fill={color}
          />
          <Path
            d="M53.169631,14.377557 C47.2228497,18.6837415 41.3571609,22.9615959 35.4644412,27.2394503 C35.5455337,27.352771 35.5995953,27.4094313 35.653657,27.4660916 C37.1403523,28.5709679 38.6540785,29.6758442 40.1407738,30.7807205 C40.1678046,30.8090507 40.2488971,30.8090507 40.3029587,30.8090507 C44.5738289,27.7210631 48.8446991,24.6047453 53.1426002,21.5167577 C53.169631,21.4884275 53.169631,21.4317672 53.1966618,21.403437 L53.1966618,14.377557 L53.169631,14.377557 Z"
            id="Shape"
            fill={color}
          />
          <Path
            d="M53.1966618,30.8090507 C51.1994254,32.3495032 49.2561684,33.8597508 47.2859216,35.3699984 C48.8513231,36.6084014 50.3627453,37.8165995 51.8741674,39.0247975 L53.1966618,37.9978292 L53.1966618,30.8090507 Z"
            id="Shape"
            fill={color}
          />
          <G transform="translate(76.84 2.054)" fill={color} id="Shape" stroke={color}>
            <Polygon points="22.1145471 0.411143002 24.0250346 0.411143002 12.7976492 18.80294 12.7976492 34.0700501 11.2012144 34.0700501 11.2012144 18.80294 0.0261710617 0.411143002 1.93665857 0.411143002 11.9340041 16.9665012 12.0125173 16.9665012" />
            <Path d="M41.5073039,34.2619169 C36.8488549,34.2619169 33.0540509,32.6173449 30.096721,29.3556104 C27.139391,26.0938759 25.6476405,22.0372649 25.6476405,17.1857775 C25.6476405,12.3891091 27.1132199,8.33249818 30.096721,5.0707637 C33.0540509,1.80902921 36.8488549,0.164457201 41.5073039,0.164457201 C45.9825554,0.164457201 49.7250172,1.75421014 52.7346893,4.93371603 C55.7443614,8.11322191 57.262283,12.1972424 57.262283,17.1857775 C57.262283,22.2017221 55.7443614,26.3131522 52.7346893,29.492658 C49.6988462,32.6721639 45.9563843,34.2619169 41.5073039,34.2619169 Z M41.5334749,32.6173449 C45.4853052,32.6173449 48.8352011,31.1920491 51.5308205,28.3140481 C54.2526109,25.4360471 55.6135061,21.7357601 55.6135061,17.213187 C55.6135061,12.690614 54.2526109,9.01773652 51.5308205,6.16714504 C48.8352011,3.28914402 45.5114763,1.89125781 41.5334749,1.89125781 C37.3722761,1.89125781 33.943867,3.37137262 31.3005898,6.3041927 C28.6573126,9.23701279 27.3225884,12.8824807 27.3225884,17.213187 C27.3225884,21.5438933 28.6573126,25.1893613 31.3005898,28.1770004 C33.9700381,31.1098205 37.3722761,32.6173449 41.5334749,32.6173449 Z" />
            <Path d="M85.1868058,34.0700501 L83.1978051,34.0700501 L73.5668544,19.9267309 L65.6108517,19.9267309 L65.6108517,34.0700501 L63.9882458,34.0700501 L63.9882458,0.411143002 L74.666039,0.411143002 C78.042106,0.411143002 80.580699,1.28824807 82.2556469,3.04245822 C83.9305949,4.79666836 84.7680688,7.15388824 84.7680688,10.0867083 C84.7680688,13.1839856 83.9305949,15.5412055 82.2556469,17.1857775 C80.580699,18.80294 78.3823298,19.7348641 75.6343683,19.8993213 L75.5820262,20.036369 L85.1868058,34.0700501 Z M65.5846806,2.08312455 L65.5846806,18.3095684 L73.9594204,18.3095684 C80.0572777,18.3095684 83.0931209,15.568615 83.0931209,10.0592988 C83.0931209,7.40057404 82.3603312,5.3996781 80.8947517,4.08402049 C79.4291722,2.76836288 77.3878294,2.08312455 74.7707233,2.08312455 L65.5846806,2.08312455 Z" />
            <Path d="M105.390865,34.2619169 C100.732416,34.2619169 96.9376125,32.6173449 93.9802826,29.3556104 C91.0229526,26.0938759 89.5312021,22.0372649 89.5312021,17.1857775 C89.5312021,12.3891091 90.9967815,8.33249818 93.9802826,5.0707637 C96.9376125,1.80902921 100.732416,0.164457201 105.390865,0.164457201 C109.866117,0.164457201 113.608579,1.75421014 116.618251,4.93371603 C119.627923,8.11322191 121.145845,12.1972424 121.145845,17.1857775 C121.145845,22.2017221 119.627923,26.3131522 116.618251,29.492658 C113.582408,32.6721639 109.839946,34.2619169 105.390865,34.2619169 Z M105.417037,32.6173449 C109.368867,32.6173449 112.718763,31.1920491 115.414382,28.3140481 C118.136172,25.4360471 119.497068,21.7357601 119.497068,17.213187 C119.497068,12.690614 118.136172,9.01773652 115.414382,6.16714504 C112.718763,3.28914402 109.395038,1.89125781 105.417037,1.89125781 C101.255838,1.89125781 97.8274286,3.37137262 95.1841514,6.3041927 C92.5147031,9.23701279 91.20615,12.8824807 91.20615,17.213187 C91.20615,21.5438933 92.5408742,25.1893613 95.1841514,28.1770004 C97.8535997,31.1098205 101.255838,32.6173449 105.417037,32.6173449 Z" />
            <Polygon points="128.159689 34.0700501 128.159689 0.411143002 129.756124 0.411143002 129.756124 34.0700501" />
          </G>
          <G transform="translate(120.185 47.24)" fill={color} id="Shape" stroke={color}>
            <Polygon points="10.5079706 4.074669 11.0773681 4.074669 8.33390774 11.9366906 7.76451032 11.9366906 5.53868403 4.98885756 5.51280233 4.98885756 3.31285774 11.9366906 2.74346031 11.9366906 -5.68434189e-14 4.074669 0.595279124 4.074669 3.00227732 11.0486217 5.20222191 4.074669 5.82338274 4.074669 8.04920903 11.022502" />
            <Path d="M19.6183294,4.074669 L20.1618451,4.074669 L20.1618451,11.9366906 L19.6183294,11.9366906 L19.6183294,10.1866725 L19.5924477,10.1866725 C18.9195235,11.3881775 17.8583737,11.98893 16.4607619,11.98893 C15.3737304,11.98893 14.4678709,11.6232545 13.7173016,10.9180234 C12.9667322,10.2127922 12.6043884,9.24636428 12.6043884,8.07097899 C12.6043884,6.8955937 12.9667322,5.92916579 13.6914199,5.17169527 C14.4161075,4.38810508 15.3478487,4.02242966 16.4866436,4.02242966 C17.1595678,4.02242966 17.7548469,4.1791477 18.2983627,4.51870345 C18.8418784,4.8582592 19.2818673,5.30229364 19.5924477,5.87692645 L19.6183294,5.87692645 L19.6183294,4.074669 Z M16.4607619,11.4404168 C17.3666214,11.4404168 18.1171907,11.1269807 18.7124699,10.5262283 C19.307749,9.8993561 19.6183294,9.08964624 19.6183294,8.07097899 C19.6183294,7.07843141 19.3336307,6.24260187 18.7642333,5.56349037 C18.1948358,4.88437887 17.4183848,4.54482312 16.4866436,4.54482312 C15.5549023,4.54482312 14.7784513,4.88437887 14.1314088,5.5373707 C13.4843663,6.19036252 13.1737858,7.05231174 13.1737858,8.09709866 C13.1737858,9.06352656 13.4843663,9.87323643 14.1055271,10.5001086 C14.7008062,11.1269807 15.5031389,11.4404168 16.4607619,11.4404168 Z" />
            <Polygon points="23.4747029 11.9105709 23.4747029 0 24.0510808 0 24.0510808 11.9105709" />
            <Polygon points="27.5122482 11.9105709 27.5122482 0 28.0886262 0 28.0886262 11.9105709" />
            <Path d="M38.0202189,7.80978226 C38.0202189,7.99261997 38.0202189,8.09709866 37.9943372,8.14933801 L31.4980302,8.14933801 C31.5497936,9.08964624 31.860374,9.8993561 32.4297714,10.5262283 C33.0250506,11.1531004 33.7497382,11.4665365 34.629716,11.4665365 C35.7167475,11.4665365 36.5967253,11.0486217 37.2696495,10.1866725 L37.6837567,10.5523479 C36.9331874,11.5187758 35.9496828,12.0150496 34.6814794,12.0150496 C33.594448,12.0150496 32.7144701,11.6493742 31.9897825,10.9180234 C31.2909766,10.1866725 30.9286328,9.2202446 30.9286328,8.04485931 C30.9286328,6.86947402 31.2650949,5.92916579 31.9639008,5.17169527 C32.6627067,4.41422475 33.5168029,4.04854933 34.5261892,4.04854933 C35.587339,4.04854933 36.4155534,4.41422475 37.0367142,5.11945593 C37.7096384,5.77244775 38.0202189,6.68663631 38.0202189,7.80978226 Z M34.629716,4.54482312 C33.8273833,4.54482312 33.1285774,4.83213952 32.5332982,5.40677233 C31.9380191,5.98140514 31.601557,6.71275599 31.5497936,7.62694454 L37.5025848,7.62694454 C37.4508214,6.68663631 37.1661227,5.95528547 36.6484887,5.38065266 C36.104973,4.80601985 35.4320488,4.54482312 34.629716,4.54482312 Z" />
            <Path d="M42.8083336,11.98893 C42.1354093,11.98893 41.643657,11.8060922 41.38484,11.4404168 C41.126023,11.0747414 40.9966145,10.5262283 40.9966145,9.79487741 L40.9966145,4.59706246 L39.909583,4.59706246 L39.909583,4.074669 L40.9966145,4.074669 L40.9966145,1.27986398 L41.5142485,1.22762464 L41.5142485,4.10078868 L44.5424075,4.10078868 L44.5424075,4.62318214 L41.5142485,4.62318214 L41.5142485,9.58592003 C41.5142485,10.2389119 41.5918936,10.709066 41.7730655,11.022502 C41.9542374,11.3359381 42.2906995,11.4926562 42.7824519,11.4926562 C43.3518493,11.4926562 43.8694833,11.3359381 44.3612356,10.9963824 L44.5165258,11.5187758 C43.9988918,11.8060922 43.4294944,11.98893 42.8083336,11.98893 Z" />
          </G>
          <Path d="M76.8396226,53.4023545 L111.020546,53.4023545" id="Shape" stroke={color} />
          <Path d="M172.699585,53.4023545 L208.298149,53.4023545" id="Shape" stroke={color} />
        </G>
      </G>
    </G>
  </Svg>
)

export default YoroiWalletIcon

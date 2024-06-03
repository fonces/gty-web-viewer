'use client'
import * as React from 'react';
import Page from "@/components/Page"
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { css } from '@emotion/react';

const styles = {
  table: css`
    display: grid;
    gap: 8px;
    width: 100%;
  
    table {
      border: solid 1px #ccc;
      border-collapse: collapse;
      border-radius: 2px;
      width: 100%;

      th, td {
        border: solid 1px #ccc;
        padding: 8px;
      }

      td {
        text-align: center;
      }

      tbody th {
        text-align: left;
        width: 200px;
      }
    }

    span {
      justify-self: end;
    }
  `,
  description: css`
    white-space: pre-wrap;
    word-wrap: break-word;
  `,
}

const SITE_URL = 'https://kagurazaka-mahjong.com/'
const PARTY_URL = 'https://www.hotpepper.jp/strJ001284246/?vos=evhppsg0007&pog=mt(b)ti()dv(m)cr(0)fi()gi(131468385726)ci(13271046458)lc()ps()nw()&vos=evhppsg0007&pog=mt()ti(dsa-1596978720467)dv(m)cr(578918879914)fi()gi(131468385766)ci(13271046458)lc(1009303)ps()nw(g)&gad_source=1&gclid=Cj0KCQjw3ZayBhDRARIsAPWzx8q9BUS2Z4-mG611SW7jxPyszRukdf1LkjvxbOlUkbDfTwrV6PV2jxkaAtgvEALw_wcB&gclsrc=aw.ds'
const GUESTS = [
  { name: '鈴木 優', link: 'https://saikouisen.com/members/suzuki-yu/' },
  { name: '仲林 圭', link: 'https://npm2001.com/player/nakabayashi-kei/' },
  { name: '佐治 敏哲', link: 'https://npm2001.com/player/saji-toshiaki/' },
]
const TIME_TABLES_1 = [
  { type: 'between', label: '受付開始', start: '11:30', end: '12:00' },
  { type: 'between', label: '開会式', start: '12:00', end: '12:10' },
  { type: 'between', label: '割り振り・移動', start: '12:10', end: '12:15' },
  { type: 'between', label: '1回戦', start: '12:15', end: '13:05' },
  { type: 'between', label: '2回戦', start: '13:15', end: '14:05' },
  { type: 'between', label: '3回戦', start: '14:15', end: '15:05' },
  { type: 'between', label: '4回戦', start: '15:15', end: '16:05' },
  { type: 'group', label: '休憩', etc: '~25分程度〜※' },
  { type: 'between', label: 'エキシビジョンマッチ', start: '16:30', end: '17:30' },
  { type: 'between', label: '閉会式・物販', start: '17:40', end: '18:40' },
] as const


const RULES = [
  {
    title: '基本ルール',
    text: `○ 基本的にMリーグルールに準拠します。
○  東南戦半荘戦です。
○ 喰いタン後ヅケあり（アリアリ）1飜しばりです。
○ 25,000点持ち、30,000点返しです。`,
  },
  {
    title: '順位点',
    text: `1位＋50,000点
2位＋10,000点
3位▲10,000点
4位▲30,000点
【例】
41,600点の1位→11.6P＋50.0P＝＋61.6P
22,800点の3位→▲7.2P-10.0P＝▲17.2P
同点の場合は順位を分け合う。

○ リーチ一発、裏ドラ、カンドラ、カン裏ドラありです。
○ 赤五萬、赤五索、赤五筒は各1枚で全てドラ扱い
○ 途中流局なし
（九種九牌、四風子連打、4人リーチなど）
○ 王牌は14枚残し
（ハイテイ牌のカンはできません）
○ オーラスの親のテンパイ止め、アガリ止めはありません。
○ ハコ割れ終了はありません。
（黒棒を出しておつりをもらってください）
○ ダブロン、トリプルロン無し、頭ハネになります。
（明らかに遅いロンは発声の早い方をアガリとする）
○ リーチ、ロン、ポン、チー、カン、ツモは必ず発声してください。
○ ポン、カンはチーに、ロンは全てに優先されます。但し明らかに遅れたロンやポン・カンは認められない場合があります。
○ ポン・チー・カンを行う際は【発声】→【フーロ】→【取得】→【打牌】の順に行ってください。
○ アガリ点はアガッた方が申告し対局者が責任を持って確認しあってください。
（申告は子の点数から1,300・2,600、一本場の場合1,300・2,600は1,400・2,700）
○ ノーテンは場に3,000点形式テンパイありです。
（空テン、フリテンも可。但し自分でポンしている牌の単騎待ち等自分の手牌でアガリ牌を使い切っている場合はテンパイにならない）
○ テンパイ宣言は原則、東家、南家、西家、北家の順で行う。
○ 本場は一本につき300点です。`,
  },
  {
    title: 'リーチについて',
    text: `○ リーチは発声→打牌→リーチ棒の順で行う。
○ リーチ後の見逃し、フリテンリーチはツモアガリのみできます。
○ リーチの取り消しはできません。
○ ノーテンリーチは流局時チョンボになります。
○ 自分のツモ山が無くてもリーチはかけられます。（海底以外）`,
  },
  {
    title: 'カンについて',
    text: `○ カンは4枚全て見せてからリンシャン牌をツモる様にする。
○ リーチ後のカンは面子構成が変わらない暗カンは可能（役の増減は不問）
（これに反する暗カンは、流局時アガリ時にチョンボになります）
○ 嶺上開花は全てツモアガリとする。（カンドラは増えます）
○ チャンカンにカンドラは増えない。
（暗カンのチャンカンは国士無双も含め無しです）
○ 嶺上開花と海底ツモは重複しない。`,
  },
  {
    title: 'パオについて',
    text: `○ 役満のパオはツモアガリ責任払い、放銃者がいた場合は折半払いです。
（大三元、大四喜、四槓子の最後の大明カン）`,
  },
  {
    title: 'チョンボについて',
    text: `☆チョンボは場に3000点オールを支払います。
☆継続が不可の場合は本場を積んで連荘します。
☆同卓者で続行可否を決め、決まらなければ運営が裁定を行います。
○ チョンボが発生した場合、その局はノーゲーム扱いとなり本場は増えずに同じ親で再ゲームとなる。
○ チョンボ対象
    ・正当でないアガリを宣言し倒牌した場合（誤ロン）
    ・ノーテンリーチやリーチ後の不正なカン（流局時）
    ・山を壊すなど続行不可能にした場合
    ・アガリが出た後、点棒の授受が完了していないうちに山を崩しアガリの裏ドラが不明になった場合の崩した当事者。
    ・アガリ放棄時に禁止行為を完了してしまい元の状態に戻せない時`,
  },
  {
    title: 'アガリ放棄について',
    text: `○ 先ヅモ及び正当でないツモをした場合。
○ 多牌、少牌、喰い替え、空行為（空ポン・チー・カン）
○ 錯ポン、錯チー、錯カン
○ ロン、ツモの発声のみで倒牌してない場合。
○ アガリ役は6翻でハネ満、8翻で倍満、11翻で3倍満数え役満はありません。役満は4倍満で複合します。
○ ファン牌の雀頭は全て2符で連風符はつきません。`,
  },
  {
    title: '時間制限について',
    text: `○ 制限時間が来た時点から+1局までとします。
○ +1局が終了した時点で集計を行います。`,
  },
] as const

export default function Readme() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Page>
      <Typography variant="h4" gutterBottom>GTY 〜じーさー大会やるってよ2〜</Typography>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="開催情報" {...a11yProps(0)} />
            <Tab label="タイムテーブル" {...a11yProps(1)} />
            <Tab label="ルール" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div>
            <Typography variant="h5" gutterBottom>開催日</Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>6月9日(日)</Typography>
          </div>
          <div>
            <Typography variant="h5" gutterBottom>会場</Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              <a href={SITE_URL} target="_blank">麻雀ばかんす</a>
            </Typography>
          </div>
          <div>
            <Typography variant="h5" gutterBottom>費用</Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              10,000円
            </Typography>
          </div>
          <div>
            <Typography variant="h5" gutterBottom>参加人数</Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              24人(内ゲスト3名)
            </Typography>
          </div>
          <div>
            <Typography variant="h5" gutterBottom>打ち上げ会場</Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              <a href={PARTY_URL} target="_blank">イタリアンバルNORANEKO</a>
            </Typography>
          </div>
          <div>
            <Typography variant="h5" gutterBottom>ゲスト</Typography>
            <Box sx={{ display: 'grid', gap: '4px' }}>
              {GUESTS.map(({ name, link }, index) => (
                <Typography key={index} variant="body1" sx={{ ml: 1 }}>
                  ・<a href={link} target="_blank">{name}</a>
                </Typography>
              ))}
            </Box>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div css={styles.table}>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>開始</th>
                  <th>終了</th>
                </tr>
              </thead>
              <tbody>
                {TIME_TABLES_1.map((t, index) => (
                  t.type === 'group' ? (
                    <tr key={index}>
                      <th>{t.label}</th>
                      <td colSpan={2}>{t.etc}</td>
                    </tr>
                  ) : (
                    <tr key={index}>
                      <th>{t.label}</th>
                      <td>{t.start}</td>
                      <td>{t.end}</td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
            <Typography variant="caption">※進行によって増減します。</Typography>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {RULES.map(({ title, text }, index) => (
            <div key={index}>
              <Typography variant="h5" gutterBottom>{title}</Typography>
              <Typography
                variant="body1"
                component="div"
                css={styles.description}
                sx={{ ml: 1 }}
              >{text}</Typography>
            </div>
          ))}
          <Typography variant="body2">※Mリーグルールと違うルールは☆マークで記載しています。</Typography>
        </CustomTabPanel>
      </Box>
    </Page>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ display: 'grid', gap: 4, pt: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}